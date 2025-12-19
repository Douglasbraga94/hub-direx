# 🔐 Configuração HTTPS para Produção

## ⚠️ IMPORTANTE: Por que HTTPS é essencial?

Sem HTTPS, todas as informações (incluindo senhas) trafegam em **texto plano** pela rede, permitindo que qualquer pessoa monitorando a rede veja:
- ✅ Senhas
- ✅ Tokens de autenticação
- ✅ Dados pessoais
- ✅ Informações confidenciais

**HTTPS criptografa toda a comunicação** entre navegador e servidor, tornando impossível interceptar essas informações.

---

## 🚀 Opção 1: Desenvolvimento Local (Certificado Autoassinado)

Para testar HTTPS em desenvolvimento:

```bash
# 1. Gerar certificado autoassinado
chmod +x generate-ssl-cert.sh
./generate-ssl-cert.sh

# 2. Subir com HTTPS
docker-compose -f docker-compose-ssl.yml up -d

# 3. Acessar
https://localhost
```

⚠️ **O navegador vai mostrar aviso de segurança** porque o certificado não é confiável. Clique em "Avançado" → "Continuar para localhost".

---

## 🌐 Opção 2: Produção com Let's Encrypt (RECOMENDADO)

### Passo 1: Obter domínio
Você precisa de um domínio (ex: `portal.direx.com.br`)

### Passo 2: Instalar Certbot
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot

# Gerar certificado
sudo certbot certonly --standalone -d portal.direx.com.br
```

### Passo 3: Configurar Docker
```bash
# Certificados ficam em /etc/letsencrypt/live/seu-dominio/

# Atualizar docker-compose-ssl.yml
volumes:
  - /etc/letsencrypt/live/portal.direx.com.br:/etc/nginx/ssl:ro
```

### Passo 4: Renovação automática
```bash
# Adicionar ao crontab
sudo crontab -e

# Renovar certificado a cada 3 meses
0 0 1 */3 * certbot renew --quiet && docker-compose restart frontend
```

---

## ☁️ Opção 3: Cloudflare (Mais fácil)

1. Adicionar domínio ao Cloudflare
2. Ativar SSL/TLS no painel
3. Configurar DNS para apontar para seu servidor
4. Cloudflare gerencia certificados automaticamente

**Vantagens:**
- ✅ Certificados gerenciados automaticamente
- ✅ CDN grátis
- ✅ Proteção DDoS
- ✅ Sem configuração no servidor

---

## 🔧 Opção 4: Nginx Reverse Proxy

Se já tem Nginx instalado no servidor:

```nginx
server {
    listen 80;
    server_name portal.direx.com.br;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name portal.direx.com.br;
    
    ssl_certificate /etc/letsencrypt/live/portal.direx.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/portal.direx.com.br/privkey.pem;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 📊 Verificar se HTTPS está funcionando

```bash
# Testar SSL
curl -I https://portal.direx.com.br

# Verificar certificado
openssl s_client -connect portal.direx.com.br:443 -servername portal.direx.com.br
```

---

## ❓ FAQ

**P: Posso usar HTTP em desenvolvimento?**  
R: Sim, mas sempre use HTTPS em produção.

**P: HTTPS deixa o site mais lento?**  
R: Não significativamente. HTTP/2 com HTTPS é até mais rápido.

**P: Preciso pagar por certificado?**  
R: Não! Let's Encrypt é gratuito e renovável automaticamente.

**P: E se meu domínio não tiver SSL?**  
R: O site não será considerado seguro pelo Google e navegadores mostrarão avisos.
