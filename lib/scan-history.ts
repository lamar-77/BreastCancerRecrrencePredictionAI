"use client"

export type RiskLevel = "low" | "medium" | "high"

export interface ScanRecord {
  id: string
  date: string
  risk: RiskLevel
  score: string
  imageData: string
  fileName?: string
  userId?: string
}

const SCAN_HISTORY_KEY = "nathirah-scan-history"

function getStoredScans(): ScanRecord[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(SCAN_HISTORY_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as ScanRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveScan(record: Omit<ScanRecord, "id">): ScanRecord {
  const scans = getStoredScans()
  const id = `scan-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const newRecord: ScanRecord = { ...record, id }
  const updated = [newRecord, ...scans]
  localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updated))
  return newRecord
}

export function getScanHistory(): ScanRecord[] {
  return getStoredScans()
}

export function deleteScan(id: string): void {
  const scans = getStoredScans().filter((s) => s.id !== id)
  localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(scans))
}
