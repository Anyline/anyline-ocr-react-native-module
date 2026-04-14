import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ResultCard from './ResultCard';

// Always horizontal scroll — not toggled by isScanning.
export default function ResultList({ results, isScanning, plugin, onStop }) {
  const emptyText = isScanning
    ? 'No results yet'
    : 'No results yet.\nTap a config chip to start scanning.';

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Results ({results.length})</Text>
        {isScanning && (
          // --- Anyline: requestScanStop ---
          <TouchableOpacity style={styles.stopButton} onPress={onStop}>
            <Text style={styles.stopButtonText}>■ Stop</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal result list */}
      {results.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {results.map((result) => (
            <ResultCard
              key={result.pluginResult?.blobKey ?? JSON.stringify(result)}
              exportedScanResult={result}
              plugin={plugin}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

ResultList.propTypes = {
  results: PropTypes.array.isRequired,
  isScanning: PropTypes.bool.isRequired,
  plugin: PropTypes.object.isRequired,
  onStop: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  stopButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    color: '#9e9e9e',
    fontSize: 13,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
