import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { pluginTypeLabel, pluginResultMap } from './pluginTypeHelper';
import { getPluginResultValueForUCR } from './ucrHelper';
import { WrapperSessionUcrReportResponseStatus } from 'anyline-ocr-react-native-module/AnylineInfinityPlugin';

// --- Anyline: ResultCard ---
export default function ResultCard({ exportedScanResult, plugin }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showUcrDialog, setShowUcrDialog] = useState(false);
  const [ucrText, setUcrText] = useState('');
  const [ucrPending, setUcrPending] = useState(false);

  const pluginResult = exportedScanResult?.pluginResult;
  const imageContainer = exportedScanResult?.imageContainer;

  const typeLabel = pluginTypeLabel(pluginResult);
  const resultObj = pluginResultMap(pluginResult);
  const resultJson = resultObj ? JSON.stringify(resultObj, null, 2) : '{}';

  // Cutout image — prefer saved file path (directory + filename), fall back to base64.
  const savedDir = imageContainer?.saved?.path;
  const savedName = imageContainer?.saved?.images?.cutoutImage;
  const savedPath = savedDir && savedName ? `${savedDir}/${savedName}` : null;
  const encodedB64 = imageContainer?.encoded?.images?.cutoutImage;

  let imageSource = null;
  if (savedPath) {
    imageSource = { uri: `file://${savedPath}` };
  } else if (encodedB64) {
    imageSource = { uri: `data:image/png;base64,${encodedB64}` };
  }

  // --- Anyline: requestUCRReport ---
  async function _submitUCR(correctedResult) {
    setUcrPending(true);
    try {
      const response = await plugin.requestUCRReport({
        blobKey: pluginResult?.blobKey ?? '',
        correctedResult,
      });
      const succeeded = response.status === WrapperSessionUcrReportResponseStatus.UcrReportSucceeded;
      Alert.alert(
        succeeded ? 'UCR reported successfully' : 'UCR report failed',
        succeeded ? undefined : response.failInfo?.lastError ?? 'Unknown error',
      );
    } catch (e) {
      Alert.alert('UCR report failed', String(e?.message ?? e));
    } finally {
      setUcrPending(false);
      setShowUcrDialog(false);
    }
  }

  function _openUcrDialog() {
    setUcrText(getPluginResultValueForUCR(pluginResult));
    setShowUcrDialog(true);
  }

  return (
    <>
      {/* Fixed-width card — tap to expand */}
      <TouchableOpacity style={styles.card} onPress={() => setShowDetail(true)}>
        <Text style={styles.typeLabel} numberOfLines={1}>
          {typeLabel}
        </Text>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.cardImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderText}>No image</Text>
          </View>
        )}
        <ScrollView style={styles.cardJsonScroll} nestedScrollEnabled>
          <Text style={styles.cardJsonText} numberOfLines={6}>
            {resultJson}
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.ucrButton}
          onPress={(e) => { e.stopPropagation?.(); _openUcrDialog(); }}
        >
          <Text style={styles.ucrButtonText}>Report UCR</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Expanded detail bottom sheet */}
      <Modal
        visible={showDetail}
        animationType="slide"
        transparent
        onRequestClose={() => setShowDetail(false)}
      >
        <TouchableOpacity
          style={styles.detailBackdrop}
          activeOpacity={1}
          onPress={() => setShowDetail(false)}
        />
        <View style={styles.detailSheet}>
          <View style={styles.detailHandle} />
          <Text style={styles.detailTitle}>{typeLabel}</Text>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.detailImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.detailImagePlaceholder}>
              <Text style={styles.placeholderText}>No image</Text>
            </View>
          )}
          <ScrollView style={styles.detailJsonScroll}>
            <Text style={styles.detailJsonText}>{resultJson}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.ucrButton} onPress={_openUcrDialog}>
            <Text style={styles.ucrButtonText}>Report UCR</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* UCR input dialog */}
      <Modal
        visible={showUcrDialog}
        animationType="fade"
        transparent
        onRequestClose={() => setShowUcrDialog(false)}
      >
        <View style={styles.dialogBackdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Report UCR</Text>
            <Text style={styles.dialogSubtitle}>Corrected result:</Text>
            <TextInput
              style={styles.dialogInput}
              value={ucrText}
              onChangeText={setUcrText}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.dialogActions}>
              <TouchableOpacity
                style={styles.dialogButton}
                onPress={() => setShowUcrDialog(false)}
              >
                <Text style={styles.dialogCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, ucrPending && styles.dialogButtonDisabled]}
                disabled={ucrPending}
                onPress={() => _submitUCR(ucrText)}
              >
                <Text style={styles.dialogSubmitText}>
                  {ucrPending ? 'Submitting…' : 'Report'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

ResultCard.propTypes = {
  exportedScanResult: PropTypes.object.isRequired,
  plugin: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  // Card (fixed-width, horizontal list item)
  card: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  typeLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 4,
  },
  cardImagePlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  cardJsonScroll: {
    maxHeight: 80,
    marginBottom: 4,
  },
  cardJsonText: {
    fontSize: 10,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },

  // UCR button
  ucrButton: {
    backgroundColor: '#0099FF',
    borderRadius: 4,
    paddingVertical: 5,
    alignItems: 'center',
  },
  ucrButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Expanded bottom sheet
  detailBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  detailSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  detailHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  detailImagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  detailJsonScroll: {
    maxHeight: 180,
    marginBottom: 12,
  },
  detailJsonText: {
    fontSize: 12,
    color: '#555',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  placeholderText: {
    color: '#9e9e9e',
    fontSize: 12,
  },

  // UCR dialog
  dialogBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dialogSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  dialogInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  dialogButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dialogButtonDisabled: {
    opacity: 0.5,
  },
  dialogCancelText: {
    color: '#666',
    fontSize: 15,
  },
  dialogSubmitText: {
    color: '#0099FF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
