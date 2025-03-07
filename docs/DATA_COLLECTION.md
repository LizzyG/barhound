# BarHound Data Collection and AI Analysis

This document outlines the data collection process, API usage, and AI analysis pipeline for the BarHound application.

## Google Places API Integration

### API Endpoints Used

1. **Places Search**
   - Endpoint: `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
   - Purpose: Find bars within the Portland, Oregon area
   - Parameters:
     - `location`: Portland, OR coordinates (45.5152° N, 122.6784° W)
     - `radius`: 20000 (20km)
     - `type`: "bar"
     - `key`: API key

2. **Place Details**
   - Endpoint: `https://maps.googleapis.com/maps/api/place/details/json`
   - Purpose: Get detailed information about each bar
   - Parameters:
     - `place_id`: ID from Places Search
     - `fields`: name,address_component,geometry,photo,formatted_address,url,website,formatted_phone_number,opening_hours,price_level,rating,review
     - `key`: API key

3. **Place Photos**
   - Endpoint: `https://maps.googleapis.com/maps/api/place/photo`
   - Purpose: Retrieve photos for each bar
   - Parameters:
     - `photo_reference`: Reference from Place Details
     - `maxwidth`: 800
     - `key`: API key

### Cost Management

Google Places API pricing (as of design time):
- Basic data: $0.017 per request (first 100,000 requests per month)
- Contact data: $0.003 per request (first 100,000 requests per month)
- Atmosphere data: $0.005 per request (first 100,000 requests per month)

To manage costs:

1. **Batch Processing**
   - Process a maximum of 100 bars per weekly run
   - Prioritize bars with oldest refresh dates

2. **Tiered Refresh Schedule**
   - Basic data: Refresh every 4 weeks
   - Photos: Refresh every 8 weeks
   - Reviews: Refresh every 2-4 weeks (based on popularity)

3. **Caching**
   - Store all API responses in the database
   - Only request data that has changed or expired

4. **API Usage Monitoring**
   - Log all API calls with timestamps and response sizes
   - Set up alerts for approaching API limits
   - Implement automatic pausing if approaching cost thresholds

## Data Collection Workflow

### Initial Data Collection

1. **Geographic Area Definition**
   - Define Portland, OR as the center point
   - Set a 20km radius for the initial search

2. **Bar Discovery**
   - Use Places Search to find all bars in the area
   - Store basic information (place_id, name, location)

3. **Detail Enrichment**
   - For each discovered bar, fetch full details
   - Download and store photo references
   - Store operating hours, contact info, etc.

4. **Review Collection**
   - Fetch all available reviews for each bar
   - Store raw review text for AI analysis

### Incremental Updates

1. **Prioritization**
   - Sort bars by last_refreshed timestamp
   - Select the 100 oldest records for updating

2. **Differential Updates**
   - Compare new data with existing data
   - Only update fields that have changed
   - Flag significant changes for review

3. **Photo Management**
   - Check for new photos since last update
   - Download new photos and update references
   - Remove references to photos no longer available

## AI Analysis Pipeline

### Review Analysis

1. **Text Preprocessing**
   - Combine all reviews for a bar into a single document
   - Clean text (remove special characters, normalize case)
   - Remove stop words and perform tokenization

2. **Attribute Extraction**
   - Use NLP to identify mentions of the 6 core attributes:
     - Live music
     - Dog-friendly
     - Pool tables
     - Happy hour specials
     - Outdoor seating
     - Sports viewing

3. **Confidence Scoring**
   - Assign confidence scores (0.0-1.0) based on:
     - Frequency of mentions
     - Recency of reviews mentioning the attribute
     - Sentiment associated with the attribute
     - Consistency across multiple reviews

4. **Conflict Resolution**
   - When Google Places data and AI analysis conflict:
     - Prefer Google Places data for factual attributes
     - Use AI analysis for subjective or unlisted attributes
     - When confidence is high (>0.8), prefer AI analysis

### Attribute Detection Examples

For each core attribute, we'll look for specific keywords and phrases:

1. **Live Music**
   - Keywords: "live music", "band", "DJ", "performance", "concert", "musician", "play music"
   - Example: "They have live bands every Friday night"

2. **Dog-Friendly**
   - Keywords: "dog friendly", "pet friendly", "dogs allowed", "bring your dog", "dog-friendly patio"
   - Example: "Great spot to bring your dog, they even have water bowls"

3. **Pool Tables**
   - Keywords: "pool table", "billiards", "shoot pool", "playing pool", "pool tournament"
   - Example: "They have two pool tables in the back room"

4. **Happy Hour**
   - Keywords: "happy hour", "drink specials", "discounted drinks", "happy hour menu"
   - Example: "Great happy hour specials from 4-6pm daily"

5. **Outdoor Seating**
   - Keywords: "outdoor seating", "patio", "outdoor area", "rooftop", "sidewalk seating"
   - Example: "Beautiful patio with heaters for the winter"

6. **Sports Viewing**
   - Keywords: "sports bar", "watch the game", "big screen", "TVs", "game day", "sports package"
   - Example: "Great place to watch Blazers games with lots of TVs"

## Data Storage

### File Storage

1. **Photo Storage**
   - Store photos in a cloud storage bucket
   - Use a consistent naming convention: `{bar_id}_{photo_index}.jpg`
   - Generate thumbnails for faster loading

2. **Backup Strategy**
   - Weekly backups of the entire database
   - Daily incremental backups
   - Retention policy: 30 days

### Database Updates

1. **Transaction Safety**
   - Use database transactions for all updates
   - Implement rollback mechanisms for failed updates

2. **Audit Trail**
   - Log all data changes with timestamps and sources
   - Track confidence scores over time

## Monitoring and Maintenance

1. **Data Quality Checks**
   - Regular validation of data integrity
   - Automated checks for missing or inconsistent data

2. **Performance Monitoring**
   - Track API response times
   - Monitor database query performance
   - Optimize slow-performing operations

3. **Error Handling**
   - Implement retry logic for API failures
   - Log detailed error information
   - Send alerts for persistent failures

## Future Enhancements

1. **Expanded Attribute Set**
   - Add additional attributes based on user feedback
   - Implement more sophisticated NLP for nuanced attributes

2. **User Feedback Integration**
   - Allow users to confirm or correct AI-derived attributes
   - Use user feedback to improve confidence scoring

3. **Geographic Expansion**
   - Extend coverage to additional cities
   - Implement regional data collection schedules

4. **Real-time Updates**
   - Integrate with real-time data sources when available
   - Implement webhooks for immediate updates 