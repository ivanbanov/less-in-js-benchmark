# LESS-in-JS Benchmark

This project benchmarks different LESS-in-JS strategies using `rspack` by simulating large-scale component usage. The profiling data was manually collected using Chrome's Performance tab.

The benchmark uses Chrome's CPU throttling feature set to 4x slowdown to simulate consistent performance across different machines.

The benchmark was ran on a MacBook Pro (Apple M1 Pro), 32 GB RAM.

## 📊 Performance Results (2000 Components)

### `<style>` vs CSS Extract

| Metric      | `<style>` | CSS Extract | Diff    |
|-------------|-----------|-------------|---------|
| Scripting   | 1200ms    | 630ms       | -48% 🟢 |
| Rendering   | 373ms     | 117ms       | -69% 🟢 |
| Painting    | 112ms     | 101ms       | -10% 🟢 |
| Build time  | 5.4s      | 5.8s        | +7%  🟡 |

### `<style>` vs CSS Extract + Atomic CSS

| Metric      | `<style>` | CSS Extract + Atomic CSS | Diff    |
|-------------|-----------|--------------------------|---------|
| Scripting   | 1200ms    | 630ms                    | -48% 🟢 |
| Rendering   | 373ms     | 81ms                     | -78% 🟢 |
| Painting    | 112ms     | 101ms                    | -10% 🟢 |
| Build time  | 5.4s      | 1.6s                     | -70% 🟢 |

### CSS Extract vs CSS Extract + Atomic CSS

| Metric      | CSS Extract | CSS Extract + Atomic CSS | Diff    |
|-------------|-------------|--------------------------|---------|
| Scripting   | 630ms       | 630ms                    | 0%      |
| Rendering   | 117ms       | 81ms                     | -44% 🟢 |
| Painting    | 101ms       | 101ms                    | 0%      |
| Build time  | 5.8s        | 1.6s                     | -72% 🟢 |

---

## 🛠 Project Setup

```bash
npm run setup
```

Generates 2000 components, each with an individual `.less` file.

---

## 🔧 Available Commands

All commands run the setup before executing.

### Development Mode

```bash
npm run dev
```

Starts the Rspack development server for local development.

---

## 🔨 Build Commands

### Extract CSS

```bash
npm run build-extract-css
```

- Extracts `.less` styles into external CSS files.
- CSS is added to the page via `<link>` tags.

### Inline CSS

```bash
npm run build-inline-css
```

- Compiles `.less` files and injects them into `<style>` tags directly in the DOM.

### Optimize CSS

```bash
npm run build-optimize-css
```

- Combines all styles into a single `.less` file.
- Simulates atomic CSS by reusing styles across all components.

---

## 👀 Preview Commands

Each preview command builds the corresponding strategy and starts a static preview server.

```bash
npm run preview-extract-css
npm run preview-inline-css
npm run preview-optimize-css
```

---

## 🧪 Benchmark Command

Each benchmark command builds the corresponding strategy with **50,000 components** and their `.less` files.

```bash
npm run benchmark-extract-css
npm run benchmark-inline-css
npm run benchmark-optimize-css
```
