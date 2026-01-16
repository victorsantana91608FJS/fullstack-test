-- CreateTable
CREATE TABLE "Medic" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "crm" TEXT NOT NULL,
    "specialty" TEXT,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consult" (
    "id" SERIAL NOT NULL,
    "pacient" TEXT,
    "dataHota" TIMESTAMP(3) NOT NULL,
    "medicId" INTEGER NOT NULL,

    CONSTRAINT "Consult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medic_crm_key" ON "Medic"("crm");

-- AddForeignKey
ALTER TABLE "Consult" ADD CONSTRAINT "Consult_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
