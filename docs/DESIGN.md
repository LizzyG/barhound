# BarHound - Bar Finder Application Design Document

## Project Overview

BarHound is a web application that helps users find nearby bars that match specific criteria such as opening hours, amenities (pool tables, dart boards), policies (dog-friendly), and more. The application will feature an interactive map interface alongside a filterable list of bar cards.

## Technology Stack

### Frontend
- **Framework**: Vue 3.5
- **Build Tool**: Vite 6
- **CSS Framework**: Tailwind 4 with DaisyUI 5
- **Map Library**: Leaflet
- **Router**: Vue Router

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Anonymous access only (user accounts planned for future phases)
- **API Access**: Read-only access for frontend users

### Data Collection
- **Primary Source**: Google Places API
- **Data Enhancement**: AI analysis of reviews to extract additional attributes
- **Update Mechanism**: Weekly scheduled cronjob

## Application Structure

### Directory Structure
```
barhound/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Vue components
│   │   ├── layout/      # Layout components (Header, Footer, etc.)
│   │   ├── map/         # Map-related components
│   │   ├── bars/        # Bar listing components
│   │   └── filters/     # Filter components
│   ├── composables/     # Reusable Vue composition functions
│   ├── router/          # Vue Router configuration
│   ├── stores/          # State management
│   ├── styles/          # Global CSS styles
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

### Core Features

#### 1. Location Services
- Request user location permission
- Default to Portland, Oregon if permission is denied
- Store user's preferred location for future visits (in local storage)

#### 2. Interactive Map
- Leaflet-based map centered on user's location or default location (Portland, OR)
- Pins representing bars that match current filters
- Interactive pins that highlight corresponding bar card when clicked
- Responsive design that works well on both desktop and mobile

#### 3. Filter System
- Core filter attributes (6 total):
  - Live music
  - Dog-friendly
  - Pool tables
  - Happy hour specials
  - Outdoor seating
  - Good for watching sports
- Additional filter options:
  - Opening hours
  - Price range
  - Rating
  - Distance from current location
- Filter UI at the top of the page
- Clear all filters button

#### 4. Bar Listings
- Card-based display of bars matching current filters
- Each card includes:
  - Bar name and logo/image
  - Address and distance from current location
  - Rating
  - Attribute chips (visual indicators of matching filters)
  - Brief description
  - Operating hours
- Cards should visually connect to map pins
- Clicking a card should highlight the corresponding pin on the map

### Database Schema

#### Bars Table
```
id: UUID (primary key)
name: String
address: String
latitude: Float
longitude: Float
phone_number: String
website: String
google_place_id: String
rating: Float
price_level: Integer
photo_references: Array<String>
created_at: Timestamp
updated_at: Timestamp
last_refreshed: Timestamp
```

#### Bar Attributes Table
```
id: UUID (primary key)
bar_id: UUID (foreign key to bars.id)
attribute_id: UUID (foreign key to attributes.id)
value: Boolean/String/Integer (depending on attribute type)
confidence_score: Float (for AI-derived attributes)
source: String (e.g., "google_places", "ai_analysis")
created_at: Timestamp
updated_at: Timestamp
```

#### Attributes Table (Core Attributes)
```
id: UUID (primary key)
name: String (e.g., "has_live_music", "is_dog_friendly", "has_pool_tables", "has_happy_hour", "has_outdoor_seating", "good_for_sports")
display_name: String (e.g., "Live Music", "Dog Friendly", "Pool Tables", "Happy Hour", "Outdoor Seating", "Sports Viewing")
category: String (e.g., "amenities", "policies", "features")
type: String (boolean for all core attributes)
icon: String (for UI display)
created_at: Timestamp
updated_at: Timestamp
```

#### Operating Hours Table
```
id: UUID (primary key)
bar_id: UUID (foreign key to bars.id)
day_of_week: Integer (0-6, where 0 is Sunday)
open_time: Time
close_time: Time
is_closed: Boolean
created_at: Timestamp
updated_at: Timestamp
```

### UI/UX Design

#### Layout
- Responsive design that works on both desktop and mobile
- Desktop: Sidebar with filters, main content area with map and bar listings
- Mobile: Filters accessible via expandable panel, toggleable views between map and listings

#### Color Scheme
- Primary color scheme defined in a main CSS file for easy theming
- Dark mode support (future enhancement)

#### Components
1. **Header**
   - Logo and branding
   - Navigation menu
   - Location selector

2. **Filter Panel**
   - Core attribute filters prominently displayed
   - Secondary filters in collapsible sections
   - Clear all filters button

3. **Map Component**
   - Zoom controls
   - Geolocation button
   - Custom pin styling for different bar types or states

4. **Bar Card**
   - Image gallery
   - Quick info section
   - Attribute chips (focusing on the 6 core attributes)
   - Expandable details

5. **Footer**
   - Links to about, privacy policy, etc.
   - Social media links
   - Copyright information

### Data Collection Process

1. **Google Places API Integration**
   - Weekly scheduled cronjob to fetch bar data for Portland, Oregon area
   - Implement cost-limiting logic to avoid excessive API usage:
     - Prioritize updating bars with older data first
     - Limit number of API calls per run
     - Focus on bars with high user engagement (future enhancement)
   - Store basic information (name, address, hours, etc.)
   - Download and store references to photos

2. **AI Analysis Pipeline**
   - Fetch reviews for each bar
   - Use AI to analyze reviews and extract mentions of the 6 core attributes
   - Assign confidence scores to AI-derived attributes
   - Store results in the database

### Future Enhancements

1. **User Accounts**
   - Favorites and saved filters
   - Review submission
   - Social features (sharing, recommendations)

2. **Advanced Filtering**
   - Time-based filtering (e.g., "Open now" or "Open on Sundays after 8 PM")
   - Compound filters (e.g., "Has pool tables AND allows dogs")

3. **Crowdsourced Data**
   - Allow users to submit corrections or additional information
   - Verification system for user-submitted data

4. **Mobile App**
   - Native mobile applications using capacitor or similar technology

## Monetization Strategy

BarHound will implement a multi-faceted monetization approach to ensure sustainable growth while maintaining a positive user experience:

### Web Platform Monetization

1. **Advertising**
   - **Non-intrusive Display Ads**: Strategically placed banner and sidebar ads that don't interfere with core functionality
   - **Ad Providers**: 
     - Google AdSense (primary)
     - Carbon Ads (developer-focused, higher quality)
     - Direct partnerships with local breweries and bar-related businesses
   - **Native Advertising**: Sponsored bar listings with clear labeling
   - **Ad-Free Subscription Option**: Premium tier for users who prefer an ad-free experience

2. **Affiliate Partnerships**
   - Commission-based partnerships with:
     - Food delivery services
     - Ride-sharing companies
     - Event ticketing platforms
     - Bar equipment and home bar suppliers

3. **Featured Listings for Businesses**
   - Premium placement for bars willing to pay for enhanced visibility
   - Enhanced business profiles with additional photos, videos, and custom descriptions
   - Promotional badge for special events or offers

### Mobile App Monetization

1. **Freemium Model**
   - Free version with core functionality and ads
   - Paid premium version ($2.99 - $4.99) with:
     - No advertisements
     - Offline mode
     - Enhanced filters
     - Personalized recommendations

2. **In-App Purchases**
   - Special filter packs
   - Enhanced data visualization
   - Priority notifications for events at favorite bars

3. **Apple App Store / Google Play Distribution**
   - iOS App Store (primary focus)
   - Google Play Store (secondary phase)

### Layout Considerations for Monetization

The application's layout will be designed with monetization in mind from the beginning:

1. **Ad Placement Zones**:
   - Designated spaces between bar cards in the listing view
   - Banner position at the bottom of the screen (above footer)
   - Sidebar ad zone on desktop layouts
   - Interstitial ad opportunities between major actions (limited frequency)

2. **Premium Content Indicators**:
   - Visual distinction for sponsored/featured content
   - Clear labeling of promotional content
   - Seamless integration of affiliate links

3. **Conversion Optimization**:
   - Strategic placement of upgrade prompts
   - Value proposition messaging for premium features
   - A/B testing framework for monetization elements

## Implementation Phases

### Phase 1: MVP
- Basic map and filter functionality for the 6 core attributes
- Anonymous read-only access to Supabase
- Default location set to Portland, Oregon
- Simple UI with basic responsiveness
- Weekly data refresh via cronjob with cost-limiting logic

### Phase 2: Enhanced Features
- Improved UI/UX with animations and transitions
- Performance optimizations
- Enhanced filtering options
- Expanded geographic coverage

### Phase 3: User Accounts and Social Features
- User registration and authentication
- Personalization features
- Social sharing capabilities
- User-submitted corrections and additions

## Data Refresh Strategy

To manage API costs while keeping data fresh, we'll implement the following strategy:

1. **Tiered Refresh Schedule**:
   - Basic data (name, location, hours): Refresh every 4 weeks
   - Photos and attributes: Refresh every 8 weeks
   - Reviews (for AI analysis): Refresh every 2 weeks for popular bars, 4 weeks for others

2. **Batch Processing**:
   - Process a maximum of 100 bars per weekly run
   - Prioritize bars with oldest refresh dates

3. **Change Detection**:
   - Track significant changes between refreshes
   - Flag bars with major changes for manual review

4. **API Usage Monitoring**:
   - Implement logging of all API calls
   - Set up alerts for approaching API limits
   - Automatically pause refreshes if approaching cost thresholds 