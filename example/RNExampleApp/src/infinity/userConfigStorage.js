// File-backed user config store using expo-file-system.
// User-saved configs are persisted to <documentDirectory>/user_viewconfigs/
// and survive app restarts. Each entry is stored as a raw ScanView config JSON file.
// Label and group are derived on read via pluginTypeHelper.

import * as FileSystem from 'expo-file-system';
import { groupFromConfig, labelFromConfig } from './pluginTypeHelper';

const _DIR = FileSystem.documentDirectory + 'user_viewconfigs/';

async function _ensureDir() {
  await FileSystem.makeDirectoryAsync(_DIR, { intermediates: true });
}

export const UserConfigStorage = {
  async list() {
    try {
      await _ensureDir();
      const files = await FileSystem.readDirectoryAsync(_DIR);
      const entries = [];
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        try {
          const content = await FileSystem.readAsStringAsync(_DIR + file);
          const parsed = JSON.parse(content);
          entries.push({
            filename: file,
            configJson: content,
            label: labelFromConfig(parsed, file.replace(/\.json$/, '')),
            group: groupFromConfig(parsed),
          });
        } catch {
          // Skip malformed files silently
        }
      }
      return entries;
    } catch {
      return [];
    }
  },

  async save(filename, configJson) {
    const name = filename.endsWith('.json') ? filename : `${filename}.json`;
    await _ensureDir();
    await FileSystem.writeAsStringAsync(_DIR + name, configJson);
  },

  async delete(filename) {
    try {
      await FileSystem.deleteAsync(_DIR + filename, { idempotent: true });
    } catch {
      // Ignore errors
    }
  },
};