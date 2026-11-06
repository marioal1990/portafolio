output "url" {
  description = "URL pública del portafolio"
  value       = "https://${aws_cloudfront_distribution.sitio.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución (variable CF_DIST_ID de GitHub)"
  value       = aws_cloudfront_distribution.sitio.id
}

output "s3_bucket" {
  description = "Bucket del sitio (variable S3_BUCKET de GitHub)"
  value       = aws_s3_bucket.sitio.id
}

output "usuario_deploy" {
  description = "Usuario IAM del pipeline de despliegue (crearle access keys con la CLI)"
  value       = aws_iam_user.github_deploy.name
}
