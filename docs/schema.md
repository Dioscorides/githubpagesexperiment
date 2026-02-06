# Schema Documentation

## Overview

The Medieval Manuscripts Database uses a JSON schema to validate and structure manuscript collection records. This document explains the schema design, field requirements, and the reasoning behind validation rules.

## Schema Structure

The database consists of an array of objects, where each object represents a single library or manuscript collection. All records must conform to the schema defined in `schema.json`.

## Required Fields

The following fields must be present in every record:

- `id`
- `library`
- `nation`
- `city`
- `website`
- `copyright`
- `quantity`
- `iiif`
- `is_free_cultural_works_license`
- `is_part_of`

These fields are fundamental to the database and ensure complete, consistent records across all entries.

## Field Definitions

### Core Identification

#### `id` (integer, required)

A unique integer identifier for each record. IDs are sequential and serve as the primary key for internal reference and data management.

**Example:** `502`

**Why required:** Enables reliable record tracking, sorting, and data integrity during updates and merges.

#### `library` (string, required)

The official name of the library, archive, or institution that maintains the manuscript collection.

**Requirements:**
- Minimum 2 characters
- Should be the formal institutional name

**Example:** `"National Library of France"`

**Why required:** Identifies the source and allows users to find specific institutions.

### Geographic Information

#### `nation` (string, required)

The country where the library is located. Use the English name of the country.

**Example:** `"France"`

**Why required:** Enables geographic filtering and organization of collections by country.

#### `city` (string, required)

The city or municipality where the library is located.

**Example:** `"Paris"`

**Why required:** Provides precise geographic context and helps users locate collections.

### Access Information

#### `website` (string, required, URI format)

A direct URL to the library's manuscript collection or digitization portal.

**Requirements:**
- Must be a valid URI
- Should link directly to the manuscript section when possible
- Must use HTTPS protocol when available

**Example:** `"https://gallica.bnf.fr/html/und/manuscrits/manuscrits"`

**Why required:** Provides users with direct access to the collections. URLs are validated to ensure they are properly formatted and functional.

#### `copyright` (string, required)

Information about the copyright or license status of the digitized manuscripts in the collection.

**Acceptable values:**
- License type (e.g., "CC BY 4.0", "CC0 1.0")
- "Unknown" (if copyright status cannot be determined)
- Specific institution copyright information

**Example:** `"CC0 1.0"`

**Why required:** Users need to understand the usage rights of the materials before accessing them.

### Collection Characteristics

#### `quantity` (string, required, enumerated)

An approximate count of digitized medieval manuscripts in the collection.

**Allowed values:**
- `"Few"` - Fewer than 50 manuscripts
- `"Dozens"` - 50-100 manuscripts
- `"Hundreds"` - 100-1,000 manuscripts
- `"Thousands"` - 1,000+ manuscripts
- `"Unknown"` - Count cannot be determined

**Example:** `"Hundreds"`

**Why enumerated:** Allows consistent categorization without requiring precise counts, which are often unavailable. Ranges accommodate uncertainty and variation in collection sizes.

**Why required:** Helps users understand the scope and value of each collection.

#### `iiif` (boolean, required)

Indicates whether the collection supports IIIF (International Image Interoperability Framework) for image access and manipulation.

**Values:**
- `true` - Collection supports IIIF
- `false` - Collection does not support IIIF

**Example:** `true`

**Why required:** IIIF support is a key technical feature that determines interoperability with other tools and platforms. Users need this information to plan integration strategies.

#### `is_free_cultural_works_license` (boolean, required)

Indicates whether the collection uses a Free Cultural Works license (such as CC0, CC BY, or CC BY-SA).

**Values:**
- `true` - Collection uses a Free Cultural Works license
- `false` - Collection uses a different license or license unknown

**Example:** `false`

**Why required:** Helps users quickly identify collections with the most permissive licenses for reuse and research.

### Project Association

#### `is_part_of` (boolean, required)

Indicates whether this library's collection is part of a larger, coordinated manuscript digitization project or initiative.

**Values:**
- `true` - Collection is part of a larger project
- `false` - Collection is independent

**Example:** `true`

**Why required:** Helps users understand the organizational structure and find related collections within projects.

#### `is_part_of_project_name` (string or null, conditionally required)

The name of the larger project to which this collection belongs.

**Requirements:**
- Required if `is_part_of` is `true`
- Must not be null when `is_part_of` is `true`
- Minimum 1 character when present

**Example:** `"Europeana Manuscripts"`

**Why conditionally required:** When a collection is part of a project, users need the project name to understand the organizational context and find other related collections.

#### `is_part_of_url` (string or null, URI format, conditionally required)

A direct URL to the larger project's website or portal.

**Requirements:**
- Required if `is_part_of` is `true`
- Must not be null when `is_part_of` is `true`
- Must be a valid URI

**Example:** `"https://www.europeana.eu/"`

**Why conditionally required:** Provides users with a way to access and learn more about the larger project when applicable.

## Validation Rules

### Conditional Validation: Project Association

When a record has `is_part_of` set to `true`, both `is_part_of_project_name` and `is_part_of_url` must be present and non-null. This ensures that project information is always complete.

**Rule:** If `is_part_of` = `true`, then:
- `is_part_of_project_name` must be a string with at least 1 character
- `is_part_of_url` must be a valid URI

**Rule:** If `is_part_of` = `false`, then:
- `is_part_of_project_name` can be null
- `is_part_of_url` can be null

**Example of valid records:**

```json
{
  "is_part_of": false,
  "is_part_of_project_name": null,
  "is_part_of_url": null
}
```

```json
{
  "is_part_of": true,
  "is_part_of_project_name": "Europeana Manuscripts",
  "is_part_of_url": "https://www.europeana.eu/"
}
```

## Design Rationale

### Required Fields

All ten fields are required to ensure data completeness and consistency:

- **Identification fields** (`id`, `library`) - Enable unique record tracking
- **Geographic fields** (`nation`, `city`) - Support filtering and discovery
- **Access fields** (`website`, `copyright`) - Allow users to find and use collections
- **Characteristic fields** (`quantity`, `iiif`, `is_free_cultural_works_license`, `is_part_of`) - Enable informed decision-making about which collections to use

### Boolean Flags Instead of Enumerations

`iiif`, `is_free_cultural_works_license`, and `is_part_of` use boolean values for simplicity:

- Clear yes/no distinction
- Efficient data storage
- Straightforward API filtering

### Enumerated Quantity Field

`quantity` uses predefined categories rather than exact numbers because:

- Exact counts are often unavailable in external data sources
- Approximate ranges are sufficient for user needs
- Categories reduce data entry errors
- Consistency across records is easier to maintain

### Conditional Requirements

The project association fields use conditional requirements to:

- Enforce data integrity (project information is complete or absent)
- Prevent incomplete records (no orphaned project names or URLs)
- Support optional project association (not all collections are part of projects)

## Data Quality

All records are validated against `schema.json` before acceptance into the database.

## Versioning

This schema uses JSON Schema draft-07 for compatibility and validation tooling. Future updates to the schema will maintain backward compatibility where possible.

## Related Files

- `schema.json` - The machine-readable schema definition
- `data.json` - The actual manuscript collection records