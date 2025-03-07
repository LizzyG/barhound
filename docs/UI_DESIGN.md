# BarHound UI/UX Design Document

This document outlines the user interface and experience design for the BarHound application.

## Design Principles

1. **Simplicity**: Focus on core functionality without overwhelming users
2. **Responsiveness**: Ensure a seamless experience across desktop and mobile devices
3. **Accessibility**: Follow WCAG 2.1 AA standards for accessibility
4. **Performance**: Optimize for fast loading and smooth interactions
5. **Consistency**: Maintain consistent design patterns throughout the application

## Color Scheme

### Primary Colors
- Primary: `#7C3AED` (Purple)
- Secondary: `#10B981` (Green)
- Accent: `#F59E0B` (Amber)

### Neutral Colors
- Background: `#F9FAFB`
- Surface: `#FFFFFF`
- Text Primary: `#111827`
- Text Secondary: `#6B7280`

### Semantic Colors
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`

### Dark Mode (Future Enhancement)
- Background: `#111827`
- Surface: `#1F2937`
- Text Primary: `#F9FAFB`
- Text Secondary: `#D1D5DB`

## Typography

- **Primary Font**: Inter (Sans-serif)
- **Heading Font**: Inter (Sans-serif)
- **Monospace Font**: JetBrains Mono (for code or technical information)

### Font Sizes
- Heading 1: 2.25rem (36px)
- Heading 2: 1.875rem (30px)
- Heading 3: 1.5rem (24px)
- Heading 4: 1.25rem (20px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

## Layout

### Desktop Layout
- Fixed header with logo, navigation, and location selector
- Sidebar for filters (30% width)
- Main content area (70% width) with:
  - Map section (50% height)
  - Bar listings section (50% height)
- Footer with links and information

### Mobile Layout
- Fixed header with logo, hamburger menu, and location button
- Full-width map view with collapsible filter panel
- Swipeable transition between map and list views
- Bottom navigation bar for quick access to key features
- Expandable filters accessible via button

## Components

### Header Component
- Logo (left-aligned)
- Navigation links (center-aligned)
- Location selector (right-aligned)
- Mobile: Hamburger menu for navigation

### Filter Panel Component
- Section for each filter category
- Toggle switches for boolean filters (the 6 core attributes)
- Sliders for range filters (price, distance, rating)
- Time selectors for operating hours
- Clear all filters button
- Apply filters button (mobile only)

### Map Component
- Leaflet map with custom styling
- Custom markers for bars
- Clustering for dense areas
- Zoom controls
- Current location button
- Hover states for markers
- Selected state for active marker

### Bar Card Component
- Image carousel (swipeable)
- Bar name and rating
- Distance from current location
- Address with map link
- Attribute chips for matching filters
- Operating hours (collapsible)
- Expandable section for additional details

### Attribute Chip Component
- Icon representing the attribute
- Label text
- Color coding based on attribute category
- Active/inactive states

### Footer Component
- Links to About, Privacy Policy, Terms of Service
- Social media links
- Copyright information
- Contact information

## Interactions

### Location Selection
1. On first visit, prompt for location permission
2. If granted, center map on user's location
3. If denied, use Portland, OR as default
4. Allow manual location selection via search or map interaction

### Filtering
1. Selecting filters immediately updates map and list
2. Clear all filters button resets to default state
3. Filter state persists during session
4. Mobile: Apply button to update results after selecting filters

### Map-List Interaction
1. Clicking a map marker highlights corresponding card in list
2. Clicking a card in list highlights corresponding marker on map
3. Cards automatically scroll into view when marker is selected
4. Visual connection between active marker and card

### Card Interaction
1. Click/tap to expand card for more details
2. Swipe images to view photo gallery
3. Click on address to open in maps application
4. Click on attribute chips to filter by that attribute

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Animation and Transitions

- Smooth transitions between states (300ms duration)
- Subtle hover effects for interactive elements
- Loading states for asynchronous operations
- Map pin bounce animation for selected items

## Accessibility Considerations

- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (WCAG AA compliant)
- Focus indicators for interactive elements
- Alternative text for images
- Semantic HTML structure

## Mobile-Specific Considerations

- Touch targets minimum 44x44px
- Bottom navigation for easy thumb access
- Pull-to-refresh for updating results
- Reduced motion option for animations
- Offline state handling

## Loading States and Error Handling

### Loading States
- Skeleton screens for cards while loading
- Subtle loading indicators for map
- Progress indicators for long operations

### Error States
- Friendly error messages
- Retry options where applicable
- Fallback content when data is unavailable
- Offline detection and messaging

## Component Mockups

### Filter UI
```
+----------------------------------+
| FILTERS                      [X] |
+----------------------------------+
| FEATURES                     ▼   |
+----------------------------------+
| [✓] Live Music                   |
| [✓] Dog Friendly                 |
| [ ] Pool Tables                  |
| [ ] Happy Hour                   |
| [✓] Outdoor Seating              |
| [ ] Sports Viewing               |
+----------------------------------+
| DISTANCE                     ▼   |
+----------------------------------+
| 0 mi ○-------------○ 20 mi       |
| Currently: 5 miles               |
+----------------------------------+
| PRICE                        ▼   |
+----------------------------------+
| [$] [$$] [$$$] [$$$$]            |
+----------------------------------+
| RATING                       ▼   |
+----------------------------------+
| ★★★★★ and above                  |
+----------------------------------+
| HOURS                        ▼   |
+----------------------------------+
| [✓] Open Now                     |
| [ ] Custom Hours...              |
+----------------------------------+
|        [CLEAR ALL FILTERS]       |
+----------------------------------+
```

### Bar Card
```
+----------------------------------+
| [Image Carousel       ] ★★★★☆ 4.2|
| BAR NAME                         |
| 0.5 miles away                   |
+----------------------------------+
| 123 Main St, Portland, OR        |
+----------------------------------+
| [🎵] [🐕] [🌳]                    |
+----------------------------------+
| Open until 2:00 AM               |
+----------------------------------+
| + More Details                   |
+----------------------------------+
```

### Expanded Bar Card
```
+----------------------------------+
| [Image Carousel       ] ★★★★☆ 4.2|
| BAR NAME                         |
| 0.5 miles away                   |
+----------------------------------+
| 123 Main St, Portland, OR        |
| (503) 555-1234                   |
| www.barname.com                  |
+----------------------------------+
| [🎵] [🐕] [🌳]                    |
+----------------------------------+
| HOURS                            |
| Mon: 4:00 PM - 2:00 AM           |
| Tue: 4:00 PM - 2:00 AM           |
| Wed: 4:00 PM - 2:00 AM           |
| Thu: 4:00 PM - 2:00 AM           |
| Fri: 2:00 PM - 2:00 AM           |
| Sat: 2:00 PM - 2:00 AM           |
| Sun: 2:00 PM - 12:00 AM          |
+----------------------------------+
| ABOUT                            |
| This bar features live music on  |
| weekends, a dog-friendly patio,  |
| and great happy hour specials.   |
+----------------------------------+
| - Less Details                   |
+----------------------------------+
```

## Implementation Notes

### CSS Architecture
- Use Tailwind utility classes for most styling
- Create custom components for repeated patterns
- Define color variables in a central theme file
- Use CSS custom properties for theming
- Follow BEM naming convention for custom classes

### Responsive Strategy
- Mobile-first approach
- Use flexbox and grid for layouts
- Avoid fixed dimensions where possible
- Use relative units (rem, em, %) for sizing
- Test on multiple device sizes

### Performance Optimization
- Lazy load images
- Use appropriate image formats and sizes
- Implement code splitting
- Minimize JavaScript bundle size
- Cache API responses
- Use pagination for long lists

### Accessibility Implementation
- Use proper ARIA attributes
- Ensure keyboard navigability
- Test with screen readers
- Provide text alternatives for non-text content
- Maintain proper heading hierarchy

## Future UI Enhancements

1. **Dark Mode**
   - Toggle in settings
   - Respect system preferences
   - Persistent user preference

2. **User Accounts**
   - Profile page
   - Favorites list
   - Saved filters
   - Activity history

3. **Social Features**
   - Share bars with friends
   - Recommend bars to others
   - Comment on bars

4. **Advanced Map Features**
   - Custom routes between bars
   - Heatmap of popular areas
   - Time-based visualization of open/closed status 