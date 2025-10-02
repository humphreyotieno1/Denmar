-- CreateTable
CREATE TABLE "ai_documents" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "embedding" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_documents_type_idx" ON "ai_documents"("type");

-- CreateIndex
CREATE INDEX "ai_documents_slug_idx" ON "ai_documents"("slug");

-- CreateIndex
CREATE INDEX "ai_documents_source_idx" ON "ai_documents"("source");
