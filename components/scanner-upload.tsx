"use client"

import React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, X, ScanLine, ImageIcon, AlertCircle } from "lucide-react"

export default function ScannerUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFile = useCallback((selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) handleFile(droppedFile)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) handleFile(selectedFile)
    },
    [handleFile]
  )

  const removeFile = useCallback(() => {
    setFile(null)
    setPreview(null)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!file) return
    setIsAnalyzing(true)

    // Simulate AI analysis time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock results and navigate
    const mockScore = Math.random()
    const riskLevel = mockScore < 0.3 ? "low" : mockScore < 0.7 ? "medium" : "high"
    const params = new URLSearchParams({
      risk: riskLevel,
      score: (mockScore * 100).toFixed(1),
      date: new Date().toISOString(),
    })

    router.push(`/results?${params.toString()}`)
  }, [file, router])

  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ScanLine className="w-4 h-4" />
            <span>الماسح الذكي</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            تحليل صورة أشعة الثدي
          </h1>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto leading-relaxed">
            قومي برفع صورة الماموغرام وسيقوم نظامنا الذكي بتحليلها والتنبؤ باحتمالية عودة المرض
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-8">
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="رفع صورة الأشعة"
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                    <Upload className="w-9 h-9 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-lg">
                      اسحبي الصورة هنا أو اضغطي للرفع
                    </p>
                    <p className="text-foreground/50 text-sm mt-2">
                      {'يدعم صيغ PNG, JPG, DICOM'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt="صورة الأشعة المرفوعة"
                    fill
                    className="object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
                    aria-label="حذف الصورة"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-foreground/60 text-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span>{file?.name}</span>
                  <span className="text-foreground/40">|</span>
                  <span>{file ? (file.size / 1024 / 1024).toFixed(2) : 0} MB</span>
                </div>
              </div>
            )}
          </div>

          {preview && (
            <div className="border-t border-border p-6 bg-muted/30">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground/60 text-xs leading-relaxed">
                    هذا التحليل للأغراض التوعوية فقط ولا يغني عن استشارة الطبيب المختص. يرجى مراجعة طبيبك للحصول على تشخيص دقيق.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <ScanLine className="w-5 h-5" />
                      تحليل الصورة
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
