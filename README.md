<div align="center">

# Flow Builder (Frontend)

<em>A frontend for Flow Builder</em>
<!-- BADGES -->
<img src="https://img.shields.io/github/license/chitrank2050/flow-builder?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/chitrank2050/flow-builder?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/chitrank2050/flow-builder?style=default&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/chitrank2050/flow-builder?style=default&color=0080ff" alt="repo-language-count">
</div>

## Project Structure

```sh
└── flow-builder/
    ├── LICENCE
    ├── README.md
    ├── src/
    │   ├── canvas/
    │   ├── components/
    │   ├── hooks/
    │   ├── lib/
    │   ├── nodes/
    │   ├── store/
    │   ├── index.css
    │   ├── main.tsx
    │   └── App.tsx
    └── vite.config.ts
```

---

## Getting Started

### Installation
1. Clone the repository:
   ```bash
    git clone https://github.com/chitrank2050/flow-builder.git
   ```
2. Navigate to the project directory:
   ```bash
    cd flow-builder
   ```
3. Install dependencies:
   ```bash
    pnpm run setup
   ```

## Usage
```bash
pnpm run dev
```

## Additional commands
```bash
# Clean project i.e remove cache + Node dir + Install packages + remove dist
pnpm run obliviate

# Clean install
pnpm run clean-setup

# Lint and formatting is automatically done throu Husky pre-commit check
pnpm run lint
pnpm run lint:fix
pnpm run format

# Build
pnpm run build

# Clean build i.e remove cache + Node dir + Install packages + remove dist before building
pnpm run clean-build
```

## Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.