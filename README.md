# BarHound

BarHound is a web application that helps users find nearby bars that match specific criteria such as opening hours, amenities (pool tables, dart boards), policies (dog-friendly), and more.

## Project Status

This project is currently in the design and planning phase. See the documentation in the [docs](docs/) folder:

- [Main Design Document](docs/DESIGN.md) - Overall architecture and features
- [Data Collection Strategy](docs/DATA_COLLECTION.md) - API integration and data processing
- [UI/UX Design](docs/UI_DESIGN.md) - Interface design and user experience

## Technology Stack

- **Frontend**: Vue 3.5, Vite 6, Tailwind 4, DaisyUI 5
- **Map**: Leaflet
- **Backend**: Supabase (PostgreSQL)
- **Data Source**: Google Places API with AI-enhanced attribute extraction

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/barhound.git
cd barhound

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and Google API credentials

# Start the development server
npm run dev
```

## Features

- Find bars based on specific criteria (amenities, policies, etc.)
- Interactive map with pins for matching bars
- Detailed bar information cards
- Location-based search
- Mobile and desktop friendly design

## Project Structure

See [docs/DESIGN.md](docs/DESIGN.md) for detailed information about the project structure and architecture.

## Contributing

This project is currently in early development. If you're interested in contributing, please reach out to the project maintainers.

## License

[MIT](LICENSE)

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Leaflet](https://leafletjs.com/)
- [Supabase](https://supabase.io/)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) 