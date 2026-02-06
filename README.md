# 📚 DMMapp Library Directory

> A curated, interactive directory of digitized medieval manuscript libraries worldwide with IIIF support and open access resources.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-green)](https://dioscorides.github.io/githubpagesexperiment/)
[![JSON Schema Validation](https://img.shields.io/badge/Data%20Format-JSON%20Schema-blue)](./schema.json)

## 🎯 Overview

DMMapp (Digitized Medieval Manuscripts Application) is an open-source project that helps researchers, historians, and enthusiasts discover and access digitized medieval manuscript collections from around the world.

Instead of scattered across dozens of institutional websites, DMMapp provides a **single, searchable directory** with:
- 🔍 Advanced filtering and search capabilities
- 🌍 Global coverage with location-based discovery
- 📋 Real-time statistics and insights
- ♿ Full accessibility support
- 🚀 Lightning-fast performance with zero external dependencies

## ✨ Features

### 🎨 Interactive Dashboard
- **Real-time Search**: Instantly filter libraries by name or city
- **Advanced Filters**:
  - Filter by nation/country
  - IIIF-only filter for standardized collections
  - Open License filter for freely reusable materials
- **Live Statistics**:
  - Total libraries in database
  - Number of participating nations
  - IIIF-compliant collections count
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### 📊 Detailed Library Information
Each library entry includes:
- **Library Name & Location**: Official institution name, city, and country
- **Website Link**: Direct access to the digitized collection
- **IIIF Support**: 🖼️ Badge indicating International Image Interoperability Framework compatibility
- **Open License**: 🔓 Badge for freely reusable collections
- **Manuscript Quantity**: Approximate number of digitized manuscripts (Few, Dozens, Hundreds, Thousands)

### 📖 Comprehensive Documentation
- Getting started guide
- About the project and technology stack
- Contributing guidelines
- IIIF framework explanation

## 🚀 Quick Start

### For Users
Simply visit the live dashboard:
👉 [DMMapp Library Directory](https://dioscorides.github.io/githubpagesexperiment/)

No installation required. Everything runs in your browser!

### For Developers

#### Clone the Repository
```bash
git clone https://github.com/Dioscorides/githubpagesexperiment.git
cd githubpagesexperiment
```

#### Local Development
Since this is a static site, you can serve it locally:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

#### Build Documentation
The `/docs` folder uses MkDocs with the Material theme:

```bash
# Install dependencies
pip install mkdocs mkdocs-material

# Run locally with live reload
mkdocs serve

# Build static site
mkdocs build
```

## 📁 Project Structure

```
githubpagesexperiment/
├── index.html              # Main dashboard HTML
├── script.js               # Interactive dashboard logic (vanilla JS)
├── style.css               # Custom Material Design styling
├── data.json               # Library database (JSON format)
├── schema.json             # JSON Schema for data validation
│
├── docs/                   # MkDocs documentation
│   ├── index.md           # Home page
│   ├── about.md           # About the project
│   └── contributing.md    # Contribution guidelines
│
├── mkdocs.yml             # MkDocs configuration
├── README.md              # This file
├── CONTRIBUTING.md        # Quick contribution guide
└── LICENSE                # MIT License
```

## 🛠️ Technology Stack

### Frontend Dashboard
- **HTML5**: Semantic markup
- **CSS3**: Custom Material Design styling
- **Vanilla JavaScript**: No frameworks, pure web standards
- **Bootstrap Icons**: Beautiful, accessible icons
- **Google Fonts (Roboto)**: Professional typography

### Documentation
- **MkDocs**: Fast, simple static site generator
- **Material for MkDocs**: Beautiful, responsive theme

### Data & Validation
- **JSON**: Simple, portable flat-file database
- **JSON Schema**: Automated data validation
- **GitHub Actions**: CI/CD pipeline for automated checks

### Hosting & Deployment
- **GitHub Pages**: Free, reliable hosting with custom domain support
- **GitHub Actions**: Automatic build and deployment

## 📊 Data Schema

Each library entry in `data.json` follows this structure:

```json
{
  "library": "String - Official institution name",
  "nation": "String - Country name",
  "city": "String - City name",
  "website": "String - URL to digitized collection",
  "lat": "String - Latitude (optional, decimal degrees)",
  "lng": "String - Longitude (optional, decimal degrees)",
  "iiif": "Boolean - IIIF Manifest/Viewer support",
  "is_free_cultural_works_license": "Boolean - Free cultural works license",
  "quantity": "Enum - 'Few' | 'Dozens' | 'Hundreds' | 'Thousands' | 'Unknown'"
}
```

See [schema.json](./schema.json) for the complete JSON Schema definition.

## 🤝 Contributing

We welcome contributions! There are several ways to help:

### Adding Libraries
1. **Search First**: Ensure the library isn't already in `data.json`
2. **Edit `data.json`**: Add your entry following the schema
3. **Create a Pull Request**: Submit to the `master` branch

[Detailed Contributing Guide →](./CONTRIBUTING.md)

### Reporting Issues
Found an error or have a suggestion?
→ [Open an Issue](https://github.com/Dioscorides/githubpagesexperiment/issues)

### Development
Want to improve the codebase?
- Frontend improvements
- Documentation enhancements
- Feature requests
- Bug fixes

## 📖 About IIIF

The [International Image Interoperability Framework](https://iiif.io/) (IIIF) is a set of open standards for delivering high-quality, attributed digital objects online at scale.

Libraries supporting IIIF enable:
- **Better Discovery**: Search across multiple collections simultaneously
- **Advanced Comparison**: View and compare manuscripts side-by-side
- **Enhanced Manipulation**: Zoom, rotate, crop, and annotate images
- **Reusability**: Embed and share digitized collections freely

## 🎨 Design Principles

1. **Simplicity**: Clean, maintainable code and design
2. **Performance**: Fast loading with minimal dependencies
3. **Accessibility**: WCAG compliant for all users
4. **Consistency**: Unified visual design across all components
5. **Open Source**: Transparent development, community-driven

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

This means you're free to use, modify, and distribute this project, with proper attribution.

## 🙋 Support & Questions

- **Documentation**: See the [docs/](./docs/) folder for comprehensive guides
- **Issues & Discussions**: [GitHub Issues](https://github.com/Dioscorides/githubpagesexperiment/issues)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🔗 Related Resources

- [IIIF Official Website](https://iiif.io/)
- [MkDocs Documentation](https://www.mkdocs.org/)
- [JSON Schema](https://json-schema.org/)
- [Material Design](https://material.io/)
- [GitHub Pages](https://pages.github.com/)

## 📈 Project Statistics

- **Total Libraries**: See dashboard for current count
- **Countries Represented**: Explore the directory to discover
- **IIIF-Ready Collections**: Filter to see available options
- **Last Updated**: Check GitHub commit history

## 🚀 Roadmap

Potential future enhancements:
- Geographic map view of libraries
- Advanced search with full-text manuscript data
- Collections comparison tool
- User submissions and voting system
- API for third-party integrations
- Multi-language support

## 👨‍💻 Author

Created with ❤️ in the Netherlands

Want to see your name here? [Contribute today!](./CONTRIBUTING.md)

---

**Made with ❤️ for researchers, historians, and manuscript enthusiasts everywhere.**

[Visit the Live Dashboard](https://dioscorides.github.io/githubpagesexperiment/) | [View Documentation](./docs/) | [Contribute](./CONTRIBUTING.md)
