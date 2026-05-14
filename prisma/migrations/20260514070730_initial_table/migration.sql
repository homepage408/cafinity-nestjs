-- CreateTable
CREATE TABLE "cafes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "tagline" TEXT,
    "address" TEXT,
    "city" VARCHAR(100),
    "latitude" DECIMAL(10,6),
    "longitude" DECIMAL(10,6),
    "open_hours" VARCHAR(100),
    "phone" VARCHAR(20),
    "instagram" VARCHAR(100),
    "rating" DECIMAL(2,1) DEFAULT 0,
    "reviews" INTEGER DEFAULT 0,
    "price_level" INTEGER,
    "hero_img" VARCHAR(10),
    "vibe_emoji" VARCHAR(10),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN DEFAULT false,
    "approved_reason" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cafes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "cafe_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "strength" INTEGER,
    "is_safe" BOOLEAN DEFAULT true,
    "description" TEXT,
    "image" VARCHAR(255),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "is_primary" BOOLEAN DEFAULT false,
    "position" INTEGER DEFAULT 0,
    "cafe_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafe_tags" (
    "cafe_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cafe_tags_pkey" PRIMARY KEY ("cafe_id","tag_id")
);

-- CreateTable
CREATE TABLE "cafe_facilities" (
    "cafe_id" INTEGER NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cafe_facilities_pkey" PRIMARY KEY ("cafe_id","facility_id")
);

-- CreateIndex
CREATE INDEX "idx_cafes_city" ON "cafes"("city");

-- CreateIndex
CREATE UNIQUE INDEX "facilities_name_key" ON "facilities"("name");

-- CreateIndex
CREATE INDEX "idx_menus_cafe_id" ON "menus"("cafe_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "idx_cafe_facilities_cafe_id" ON "cafe_facilities"("cafe_id");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafe_tags" ADD CONSTRAINT "cafe_tags_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafe_tags" ADD CONSTRAINT "cafe_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafe_facilities" ADD CONSTRAINT "cafe_facilities_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafe_facilities" ADD CONSTRAINT "cafe_facilities_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
