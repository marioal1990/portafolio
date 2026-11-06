# ============================================================
# S3: archivos del portafolio (Angular)
# Privado: solo CloudFront puede leerlo (OAC)
# ============================================================

resource "aws_s3_bucket" "sitio" {
  bucket        = var.bucket_nombre
  force_destroy = false
}

resource "aws_s3_bucket_public_access_block" "sitio" {
  bucket                  = aws_s3_bucket.sitio.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "sitio" {
  bucket = aws_s3_bucket.sitio.id
  rule {
    object_ownership = "BucketOwnerEnforced" # sin ACLs, todo por políticas
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "sitio" {
  bucket = aws_s3_bucket.sitio.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Solo esta distribución de CloudFront puede leer los objetos
resource "aws_s3_bucket_policy" "sitio" {
  bucket = aws_s3_bucket.sitio.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.sitio.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.sitio.arn
        }
      }
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.sitio]
}
