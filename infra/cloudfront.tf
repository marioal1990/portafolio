# ============================================================
# CloudFront: entrega el portafolio por HTTPS desde el bucket privado
# ============================================================

# ---------- Políticas administradas por AWS (por nombre, no por ID) ----------
data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "Managed-SecurityHeadersPolicy" # HSTS, X-Frame-Options, nosniff, etc.
}

# ---------- Función: routing de la SPA (rutas sin extensión -> index.html) ----------
resource "aws_cloudfront_function" "spa_rewrite" {
  name    = "portafolio-spa-rewrite" # el nombre es único por cuenta: no choca con el de tareas-aws
  runtime = "cloudfront-js-2.0"
  publish = true
  # Se normalizan los saltos de línea para que el resultado sea igual en Windows y en Linux (CI)
  code = trimspace(replace(file("${path.module}/cloudfront/spa-rewrite.js"), "\r\n", "\n"))
}

# ---------- Origin Access Control: credencial con la que CloudFront lee el bucket ----------
resource "aws_cloudfront_origin_access_control" "sitio" {
  name                              = "oac-${var.bucket_nombre}"
  description                       = "Acceso de CloudFront al bucket del portafolio"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ---------- Distribución ----------
resource "aws_cloudfront_distribution" "sitio" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  price_class         = "PriceClass_All" # incluye Sudamérica: mejor latencia desde Chile
  default_root_object = "index.html"
  comment             = "Portafolio Mario Araya"

  origin {
    origin_id                = "s3-portafolio"
    domain_name              = aws_s3_bucket.sitio.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.sitio.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-portafolio"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.security_headers.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_rewrite.arn
    }
  }

  # Un archivo inexistente (ej. /foto.png) devuelve 403 desde S3: se muestra el inicio
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/index.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  lifecycle {
    # Recrearla cambiaría el dominio *.cloudfront.net que compartes en tu CV y LinkedIn
    prevent_destroy = true
  }
}
