import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { GROUP_ORDER } from './pluginTypeHelper';

const CHIP_ROW_HEIGHT = 52;

export default function ConfigBrowser({
  configsByGroup,
  activeGroupIndex,
  onGroupChange,
  onConfigTap,
  onEditSaveAs,
  onDelete,
  isScanning,
}) {
  const groupNames = GROUP_ORDER.filter((g) => configsByGroup[g]?.length > 0);
  const activeGroup = groupNames[activeGroupIndex] ?? groupNames[0];
  const configs = configsByGroup[activeGroup] ?? [];

  // Chip row height drives the animated collapse; no separate expanded state needed.
  const chipRowHeight = useRef(new Animated.Value(isScanning ? 0 : CHIP_ROW_HEIGHT)).current;

  // Long-press context menu state
  const [menuConfig, setMenuConfig] = useState(null);
  // iOS nested Modal fix: UIKit silently drops a Modal presented while the previous
  // one is still animating out. pendingEditRef holds the config to forward to
  // onEditSaveAs once the context menu's onDismiss fires (after animation completes).
  // Android has no such restriction — onEditSaveAs is called directly.
  const pendingEditRef = useRef(null);

  useEffect(() => {
    Animated.timing(chipRowHeight, {
      toValue: isScanning ? 0 : CHIP_ROW_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isScanning]);

  function _onGroupTap(index) {
    onGroupChange(index);
    if (isScanning) {
      // Temporarily reveal chip row so user can tap a chip to switch scan.
      Animated.timing(chipRowHeight, {
        toValue: CHIP_ROW_HEIGHT,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }

  function _onChipTap(config) {
    if (isScanning) {
      // Collapse chip row after selection while scanning.
      Animated.timing(chipRowHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onConfigTap(config);
  }

  function _onChipLongPress(config) {
    setMenuConfig(config);
  }

  return (
    <View>
      {/* Group tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.groupBar}
        contentContainerStyle={styles.groupBarContent}
      >
        {groupNames.map((group, index) => {
          const isActive = index === activeGroupIndex;
          return (
            <TouchableOpacity
              key={group}
              style={[styles.groupTab, isActive && styles.groupTabActive]}
              onPress={() => _onGroupTap(index)}
            >
              <Text style={[styles.groupTabText, isActive && styles.groupTabTextActive]}>
                {group}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Config chip row — animated collapse */}
      <Animated.View style={{ height: chipRowHeight, overflow: 'hidden' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipRow}
          contentContainerStyle={styles.chipRowContent}
        >
          {configs.map((config) => (
            <TouchableOpacity
              key={`${config.source ?? 'asset'}:${config.filename}`}
              style={[styles.chip, config.source === 'user' && styles.chipUser]}
              onPress={() => _onChipTap(config)}
              onLongPress={() => _onChipLongPress(config)}
              delayLongPress={500}
            >
              <Text style={[styles.chipText, config.source === 'user' && styles.chipTextUser]} numberOfLines={1}>
                {config.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Long-press context menu */}
      <Modal
        visible={menuConfig != null}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuConfig(null)}
        onDismiss={() => {
          // iOS only — fires after dismiss animation completes.
          if (pendingEditRef.current) {
            onEditSaveAs?.(pendingEditRef.current);
            pendingEditRef.current = null;
          }
        }}
      >
        <TouchableOpacity
          style={styles.menuBackdrop}
          activeOpacity={1}
          onPress={() => setMenuConfig(null)}
        />
        <View style={styles.menuSheet}>
          <Text style={styles.menuTitle}>{menuConfig?.label}</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              const c = menuConfig;
              setMenuConfig(null);
              if (Platform.OS === 'ios') {
                // iOS: defer until context menu Modal is fully dismissed (onDismiss).
                // Presenting a new Modal while the previous is still animating out
                // causes it to be silently dropped by UIKit.
                pendingEditRef.current = c;
              } else {
                onEditSaveAs?.(c);
              }
            }}
          >
            <Text style={styles.menuItemText}>Edit / Save as</Text>
          </TouchableOpacity>
          {menuConfig?.source === 'user' && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                const c = menuConfig;
                setMenuConfig(null);
                onDelete?.(c);
              }}
            >
              <Text style={[styles.menuItemText, styles.menuItemDestructive]}>Delete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemCancel]}
            onPress={() => setMenuConfig(null)}
          >
            <Text style={styles.menuItemText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

ConfigBrowser.propTypes = {
  configsByGroup: PropTypes.objectOf(PropTypes.array).isRequired,
  activeGroupIndex: PropTypes.number.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  onConfigTap: PropTypes.func.isRequired,
  onEditSaveAs: PropTypes.func,
  onDelete: PropTypes.func,
  isScanning: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  groupBar: {
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  groupBarContent: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  groupTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  groupTabActive: {
    backgroundColor: '#0099FF',
  },
  groupTabText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },
  groupTabTextActive: {
    color: '#fff',
  },
  chipRow: {
    backgroundColor: '#2a2a2a',
  },
  chipRowContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  chipUser: {
    backgroundColor: '#ccc',
  },
  chipText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextUser: {
    color: '#555',
  },

  // Context menu
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  menuTitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  menuItemDestructive: {
    color: '#d32f2f',
  },
  menuItemCancel: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
});
