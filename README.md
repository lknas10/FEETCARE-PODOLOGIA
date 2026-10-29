[README.md](https://github.com/user-attachments/files/34107760/README.md)
# Feet Care – Podologia Sudoeste

Site de uma página (landing page) da **Feet Care – Podologia & Spa**, clínica de podologia no Sudoeste/Octogonal, Brasília – DF. O objetivo é apresentar os serviços e levar o visitante a falar com a clínica pelo WhatsApp.

## Conteúdo do site

- Hero com a foto da podóloga em vídeo curto e em loop (movimento suave de câmera)
- Atendimento e chamada para consultar disponibilidade
- Serviços, cada um com link para o WhatsApp já com mensagem pronta
- Avaliação informada pela clínica: 4,9 estrelas em 75 avaliações
- Promoção "Indique um amigo e ganhe 5% de desconto"
- Endereço, horário informado, WhatsApp e Instagram

## Tecnologias

HTML, CSS e JavaScript puros, sem frameworks, sem build e sem dependências. A única chamada externa é a do Google Fonts (Young Serif e Albert Sans). Há modo claro e escuro automático, layout responsivo e respeito à preferência de reduzir movimento.

## Estrutura

```
.
├── index.html          # o site inteiro (imagens, logotipo e vídeo embutidos)
├── podologa-loop.mp4   # opcional: o mesmo vídeo do hero, para reutilizar em redes sociais
└── README.md
```

## Como ver no computador

Abra o `index.html` no navegador. Não é preciso instalar nada.

## Como publicar

**GitHub Pages**
1. Envie `index.html` para a raiz do repositório.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Aguarde alguns minutos; o endereço aparece na mesma tela.

**Hospedagem comum (cPanel etc.)**: envie o `index.html` para a pasta principal (normalmente `public_html`).

**Netlify, Vercel ou Cloudflare Pages**: aponte para o repositório ou envie o arquivo. Não há comando de build.

## Como editar

| O que mudar | Onde |
| --- | --- |
| Número do WhatsApp | links que começam com `https://wa.me/5561998872244` e o texto `(61) 99887-2244` |
| Cores | variáveis no começo do CSS, dentro de `:root` (verde da marca `--deep`, creme `--cream` etc.) |
| Serviços | lista dentro de `<section class="services">` |
| Promoção | `<section class="promo">`; remova a seção se a promoção acabar |
| Endereço e horário | bloco `<section class="where">` |
| Vídeo do hero | tag `<video>` dentro de `.frame` |

As imagens e o vídeo estão embutidos no HTML em base64, então esses trechos são muito longos. Para trocar uma imagem, o mais simples é gerar um novo texto em base64 ou apontar o `src` para um arquivo de uma pasta `assets/`.

## Regras de conteúdo

O texto usa apenas informações fornecidas pela clínica. Não há preços, certificações, depoimentos, garantias nem promessa de cura. Antes de publicar, confirme:

- os horários completos de atendimento (o site informa apenas que fecha às 18h);
- se a promoção de 5% continua válida e quais são as condições;
- se a nota 4,9 e as 75 avaliações continuam atuais.

## Direitos

Logotipo, fotos, vídeo e textos pertencem à Feet Care e não devem ser reutilizados sem autorização da clínica.

## Contato da clínica

- WhatsApp: (61) 99887-2244
- Instagram: [@feetcare_podologia](https://www.instagram.com/feetcare_podologia)
- Endereço: St. Sudoeste QMSW 5, Bloco A, loja 26, Sudoeste/Octogonal, Brasília – DF, CEP 70673-001
