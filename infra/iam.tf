# ============================================================
# Usuarios técnicos de GitHub Actions
# (las access keys NO se gestionan con Terraform: quedarían en el state)
# ============================================================

# ---------- Despliegue del sitio: subir a S3 e invalidar CloudFront ----------
resource "aws_iam_user" "github_deploy" {
  name = "github-deploy-portafolio"
  path = "/"
}

resource "aws_iam_user_policy" "github_deploy" {
  name = "deploy-portafolio"
  user = aws_iam_user.github_deploy.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = aws_s3_bucket.sitio.arn
      },
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.sitio.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation", "cloudfront:GetDistribution"]
        Resource = aws_cloudfront_distribution.sitio.arn
      },
    ]
  })
}

# ---------- Pipeline de Terraform ----------
# Se REUTILIZAN los usuarios github-terraform-plan / -apply creados en tareas-aws
# (mismos secrets). El de plan solo puede usar el state bajo "tareas-aws/*",
# así que aquí se le agrega acceso al prefijo de este proyecto.
# El de apply es administrador: no necesita nada extra.
resource "aws_iam_user_policy" "terraform_plan_state" {
  name = "tfstate-portafolio"
  user = var.usuario_terraform_plan
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
      Resource = "arn:aws:s3:::${var.tfstate_bucket}/portafolio/*"
    }]
  })
}
