# Payment logo assets

The payment strip (`components/PaymentBadges.tsx`) renders one logo per method
from this folder. Drop the official / properly-licensed brand SVGs here using
these **exact filenames** and they appear automatically (until then, each badge
shows a clean brand-coloured wordmark fallback):

| File | Method | Suggested official source |
|------|--------|---------------------------|
| `paypal.svg`      | PayPal      | PayPal brand / developer assets |
| `visa.svg`        | Visa        | Visa brand center |
| `mastercard.svg`  | Mastercard  | Mastercard brand center |
| `apple-pay.svg`   | Apple Pay   | Apple "Apple Pay Marks" identity guidelines |
| `google-pay.svg`  | Google Pay  | Google Pay brand guidelines |
| `bitcoin.svg`     | Bitcoin     | bitcoin.org / bitcoin-design (open assets) |
| `usdt.svg`        | USDT (Tether) | Tether brand assets |
| `ethereum.svg`    | Ethereum    | ethereum.org brand assets (open) |

Notes
- SVG preferred (crisp at any size). PNG works too — change the extension in
  `PaymentBadges.tsx` if needed.
- Logos render at ~28px tall inside a 96px badge, `object-fit: contain`.
- Use each brand's assets in line with its guidelines; these marks are
  trademarks of their respective owners and are shown to indicate accepted
  payment methods.
