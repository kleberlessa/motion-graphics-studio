---
title: Motion Graphics Studio - Linux
emoji: 🎬
colorFrom: blue
colorTo: purple
sdk: static
pinned: false
license: mit
---

A powerful, open-source studio for creating 2D vector animations, motion graphics for text, and logo animations using JavaScript and modern web technologies. Designed specifically for Linux environments like Zorin OS, this tool provides a complete workflow from design to export without proprietary software.

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Studio](#running-the-studio)
- [Hugging Face Synchronization](#hugging-face-synchronization)
    - [Initial Setup](#initial-setup)
    - [Automated Sync with GitHub Actions](#automated-sync-with-github-actions)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Support](#support)

## 🎯 Overview

Motion Graphics Studio transforms your Linux environment into a complete animation workflow. Create stunning vector animations, animated text effects, and professional logo reveals using only open-source tools. The studio integrates SVG creation, JavaScript animation, and real-time preview—perfect for designers and developers who want to create motion graphics without leaving their Linux environment.

## ✨ Features

- **Vector Animation System**: Animate SVG paths, shapes, and logos with precision timing
- **Text Motion Effects**: Typography animations, kinetic text, and dynamic type
- **Real-time Preview**: See animations immediately as you code
- **Export Options**: Export to GIF, SVG, and video formats
- **Linux-First Design**: Optimized for Zorin OS and compatible Linux distributions
- **Open Tool Integration**: Works seamlessly with Inkscape, GIMP, and Blender
- **Responsive Design**: Animations that work across devices and screen sizes

## ⚙️ Tech Stack

- **Animation Engine**: GSAP (GreenSock Animation Platform)
- **Vector Graphics**: SVG with DrawSVG and MorphSVG plugins
- **Styling**: Modern CSS with CSS Variables
- **Development Server**: Live Server with hot reload
- **Build Tools**: npm scripts for automation
- **Export Tools**: FFmpeg integration for video export

## 🚀 Getting Started

### Prerequisites

- **Zorin OS 16+** or compatible Linux distribution
- **Node.js 18+** and npm
- **Git** for version control
- **Modern Web Browser** (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**
    
    ```bash
    cd ~/Documents
    git clone <https://github.com/kleberlessa/motion-graphics-studio.git>
    cd motion-graphics-studio
    
    ```
    
2. **Install dependencies**
    
    ```bash
    npm install
    
    ```
    
3. **Install recommended Linux tools** (optional but recommended)
    
    ```bash
    sudo apt update
    sudo apt install -y inkscape gimp ffmpeg
    
    ```
    

### Running the Studio

1. **Start the development server**
    
    ```bash
    npm start
    
    ```
    
    This launches the studio at `http://localhost:8080`
    
2. **For development with live reload**
    
    ```bash
    npm run dev
    
    ```
    
    Uses port 3000 with file watching enabled
    

## 🤗 Hugging Face Synchronization

Keep your GitHub repository synchronized with Hugging Face Spaces for easy sharing and demonstration.

### Initial Setup

1. **Add Hugging Face as a remote repository**
    
    ```bash
    git remote add space <https://huggingface.co/spaces/kleberlessa/motion-graphics-studio>
    
    ```
    
2. **First-time sync** (force push to establish sync)
    
    ```bash
    git add .
    git commit -m "Initial commit"
    git push --force space main
    
    ```
    

### Automated Sync with GitHub Actions

Create `.github/workflows/sync-to-hf-space.yml`:

```yaml
name: Sync to Hugging Face hub
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          lfs: true
      - name: Push to hub
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: |
          git push <https://kleberlessa:$HF_TOKEN@huggingface.co/spaces/kleberlessa/motion-graphics-studio> main

```

**To set up the secret:**

1. Get your Hugging Face token from [HF Tokens](https://huggingface.co/settings/tokens)
2. In your GitHub repository: Settings → Secrets and variables → Actions → New repository secret
3. Name: `HF_TOKEN`, Value: [your HF token]
4. Save and your pushes to main will automatically sync

## 📁 Project Structure

```
motion-graphics-studio/
├── src/                    # Source code
│   ├── js/                # JavaScript modules
│   │   ├── main.js        # Main application logic
│   │   ├── animations.js  # Animation presets and functions
│   │   └── utils.js       # Utility functions
│   ├── css/               # Stylesheets
│   │   ├── style.css      # Main styles
│   │   └── animations.css # Animation-specific styles
│   └── components/        # Reusable components
├── assets/                # Static assets
│   ├── logos/             # SVG logos and icons
│   ├── fonts/             # Custom fonts
│   └── textures/          # Background textures
├── docs/                  # Documentation
├── index.html            # Main HTML file
├── package.json          # Dependencies and scripts
├── LICENSE               # MIT License
└── README.md            # This file

```

## 🎨 Usage Examples

### Creating a Logo Animation

```jsx
// Simple logo reveal animation
gsap.fromTo("#my-logo",
  { scale: 0, rotation: -180, opacity: 0 },
  { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
);

```

### Text Typing Effect

```jsx
// Typewriter text effect
gsap.to("#animated-text", {
  duration: 2,
  text: {
    value: "Welcome to Motion Graphics Studio",
    speed: 1
  },
  ease: "none"
});

```

### Exporting Your Animation

Use the built-in export panel or command line:

```bash
# Export as GIF using FFmpeg (after setting up)
npm run export -- --format=gif --input=animation.json

```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
    
    ```bash
    git checkout -b feature/amazing-feature
    
    ```
    
3. **Commit your changes**
    
    ```bash
    git commit -m 'Add some amazing feature'
    
    ```
    
4. **Push to the branch**
    
    ```bash
    git push origin feature/amazing-feature
    
    ```
    
5. **Open a Pull Request**

Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](https://www.notion.so/LICENSE) file for details.

**MIT License Summary:**

- ✅ Permits commercial use, distribution, modification, and private use
- ✅ Requires only that the original copyright and license notice be included
- ✅ Provides software "as is" without warranty
- ✅ Compatible with many other licenses

Copyright © 2025 kleberlessa

## 👥 Authors

- **kleberlessa** - *Initial work* - [kleberlessa@duck.com](mailto:kleberlessa@duck.com)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/kleberlessa/motion-graphics-studio/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Email**: [kleberlessa@duck.com](mailto:kleberlessa@duck.com)

---

<div align="center">
Made with ❤️ for the Linux creative community
<br>
⭐ Star this repo if you find it useful!
</div>

---

**Repository Description for GitHub/Hugging Face:**

"Motion Graphics Studio for Linux: An open-source toolkit for creating 2D vector animations, motion text, and logo animations using JavaScript. Features real-time preview, SVG animation, and seamless integration with Linux creative tools like Inkscape and GIMP. Perfect for designers and developers on Zorin OS and other Linux distributions."