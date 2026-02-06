# How to Update the Dashboard Data

Welcome! This guide walks you through updating the manuscript library information on your DMMapp dashboard. Don't worry—you don't need to know how to code. The process takes just a few minutes, and we'll guide you step by step.

## What You'll Learn

By the end of this guide, you'll know how to:

- Find and open the data file in your browser
- Add new libraries or edit existing information
- Submit your changes for review
- Verify that the dashboard reflects your updates

## Prerequisites

Before you start, make sure you have:

- A **GitHub account** (it's free—[create one here](https://github.com/signup) if you don't have one)
- **Write access** to the repository (your project administrator should have granted this to you)
- A modern web browser (Chrome, Firefox, Safari, or Edge all work great)

!!! tip "First time with GitHub?"
    GitHub is a platform where people store and collaborate on code and documents. Think of it like Google Docs, but for technical projects. We'll use GitHub's built-in editor so you never have to touch the command line.

!!! info "A Quick Note About Governance"
    The data.json file is maintained by @DIOSCORIDES. When you submit changes, they'll review your work to ensure everything meets our quality standards. This keeps the library directory accurate and reliable for researchers worldwide.

## Step 1: Navigate to the Data File

1. Open your GitHub repository in your browser
2. Click on the file named **data.json** in the file list

You're now viewing the current library data in a read-only format.

## Step 2: Click the Edit Button

Look for the **pencil icon** (✎) in the toolbar at the top of the file viewer. Click it to enter edit mode.

Your browser will switch to an editor where you can make changes. You'll see the data formatted as JSON—a structured format for storing information.

!!! warning "About JSON Format"
    JSON has strict rules about how data is organized. Each library is wrapped in curly braces `{ }`, fields are separated by commas, and text values must be in quotes. GitHub will check your changes before you submit them, so don't worry about making a perfect edit the first time.

## Step 3: Make Your Changes

### Required Fields

Every library entry must have these four fields:

- **library**: The name of the institution (e.g., "Bodleian Library")
- **nation**: The country where the library is located (e.g., "United Kingdom")
- **city**: The city name (e.g., "Oxford")
- **website**: A working link to the digitized collection (must start with `http://` or `https://`)

### Optional Fields

You can add these fields if the information is available:

- **lat**: Latitude coordinate (as text, e.g., `"51.7540"`)
- **lng**: Longitude coordinate (as text, e.g., `"-1.2566"`)
- **iiif**: Does the library support IIIF standards? (`true` or `false`)
- **is_free_cultural_works_license**: Is the collection under a free license? (`true` or `false`)
- **quantity**: How many manuscripts? (must be one of: `"Few"`, `"Dozens"`, `"Hundreds"`, `"Thousands"`, or `"Unknown"`)

### Adding a New Library

Find the last library entry in the file. It looks like this:

```json
{
    "library": "Bodleian Library",
    "nation": "United Kingdom",
    "city": "Oxford",
    "website": "https://digital.bodleian.ox.ac.uk",
    "lat": "51.7540",
    "lng": "-1.2566",
    "iiif": true,
    "is_free_cultural_works_license": true,
    "quantity": "Hundreds"
}
```

To add a new library:

1. Place your cursor after the closing `}` of the last entry
2. Add a **comma** (`,`) immediately after the `}`
3. Press Enter to create a new line
4. Copy the template above and replace the example values with your library's actual information
5. Make sure all required fields are filled in (library, nation, city, website)

### Editing Existing Information

Simply click on any value and change it. For example:

- To update a website: `"website": "https://new-collection-link.org"`
- To correct a city name: `"city": "Berlin"`
- To add coordinates: `"lat": "52.5200"` and `"lng": "13.4050"`
- To update quantity: `"quantity": "Thousands"`

!!! danger "Common Mistakes to Avoid"
    - **Missing commas**: Every field needs a comma after it, except the last one. Check: `"field": "value",`
    - **Unquoted text**: All text values must be in quotes. Wrong: `"city": Berlin`. Right: `"city": "Berlin"`
    - **Boolean values**: Use `true` or `false` without quotes for yes/no fields
    - **Invalid URLs**: Website URLs must start with `http://` or `https://`. GitHub will catch this during validation
    - **Quantity values**: Must be exactly one of the five options listed above (capitalization matters!)
    
    If you make a mistake, GitHub's validation will alert you before you submit.

## Step 4: Submit Your Changes for Review

Scroll to the bottom of the page. You'll see a **Propose changes** section.

!!! info "What's a Pull Request?"
    A "pull request" (or PR) is a formal way to submit your changes for review. It's like saying, "I've made some updates—please check them over before adding them to the official data." This ensures quality and accuracy.

### Fill in the Change Details

You'll see a form with these fields:

**Change Type** (select one):
- 🆕 New Library Entry
- ✏️ Correction (Typo, broken link, coordinate fix)
- 🗑️ Removal (Library closed/no longer digitized)

**Description**: Write a brief explanation of your change. For example:
- "Added University of Rome manuscript library with IIIF support"
- "Updated website URL for Paris collection—old link was broken"
- "Fixed spelling of library name in Berlin entry"

### Complete the Verification Checklist

Before submitting, verify that you've done these things:

- ✓ I have verified the URL works (click the link in your browser to test it)
- ✓ I have checked that the JSON is valid (no missing commas or brackets)
- ✓ I have used the correct data format (all required fields present, proper capitalization)

!!! tip "How to Test Your JSON"
    Not sure if your JSON is correct? Look for GitHub's automatic validation message. If you see a green checkmark (✓), you're good to go! If you see a red X (✗), scroll down to see what needs fixing.

## Step 5: Wait for Review and Validation

After you submit your pull request, here's what happens automatically:

### Automatic Validation (1-2 minutes)

GitHub runs automatic checks on your data:

- **JSON Syntax Check**: Ensures your data is properly formatted (no missing commas, quotes, or brackets)
- **Schema Validation**: Verifies that required fields are present and correct
- **Format Verification**: Confirms that URLs are valid, coordinates are in the right format, and quantity values match our standards

If everything passes, you'll see a green checkmark (✓) next to "All checks passed."

!!! warning "If Validation Fails"
    Don't worry! GitHub will show you exactly what's wrong. Look for red text describing the error. Common issues include:
    
    - **Missing required field**: Make sure library, nation, city, and website are all present
    - **Invalid URL format**: Website must start with http:// or https://
    - **JSON syntax error**: Check for missing commas between fields
    - **Invalid quantity value**: Must be exactly "Few", "Dozens", "Hundreds", "Thousands", or "Unknown"
    
    Go back to edit your data and fix the issue, then resubmit.

### Review by @DIOSCORIDES (24-48 hours)

Once validation passes, @DIOSCORIDES will review your changes. They'll check:

- Whether the library information is accurate
- Whether the website link actually leads to digitized manuscripts
- Whether coordinates (if provided) are correct
- Whether the data improves our collection

**Your pull request will be either:**

- ✅ **Approved and merged** — Your changes are added to the live database
- 💬 **Requested for changes** — @DIOSCORIDES may ask you to clarify or update something
- ❌ **Declined** — If the information doesn't meet quality standards

### Dashboard Updates (5-15 minutes after approval)

Once your pull request is approved and merged:

1. GitHub automatically rebuilds the website
2. Your new library appears on the dashboard
3. Filters and search become available for your data

!!! tip "Check Your Work"
    After your changes are approved:
    
    1. Wait about 10-15 minutes
    2. Refresh your dashboard page (press F5 or click the refresh button)
    3. Search for your new library or look for your edited information
    
    If you still don't see the update after 15 minutes, try clearing your browser cache (Ctrl+Shift+Delete on Windows)

## Troubleshooting

### I see red validation errors

**What to do**: GitHub is telling you something's wrong. Here's how to fix it:

1. Read the error message carefully—it tells you exactly what's wrong
2. Go back to your data and find the problem (usually missing commas, quotes, or invalid URLs)
3. Scroll down and click **Edit** again to fix it
4. Make your correction and resubmit

**Common validation errors:**

| Error | What It Means | How to Fix |
|-------|---------------|-----------|
| `Invalid JSON` | Missing comma or quote | Check each field—every field before the last needs a comma |
| `Invalid URI format` | Website URL is wrong | Make sure it starts with `http://` or `https://` |
| `Missing required property` | A required field is empty | Add library, nation, city, and website to every entry |
| `Invalid enum value` | Quantity value is wrong | Use only "Few", "Dozens", "Hundreds", "Thousands", or "Unknown" |

### My pull request is still pending after 24 hours

**What to do**: @DIOSCORIDES may be busy. Here's how to follow up:

1. Go to your pull request
2. Scroll to the bottom and add a comment: "Hi @DIOSCORIDES, could you review this when you have a moment?"
3. You can also check if validation passed (look for the green checkmark)

If validation failed, fix those errors first—@DIOSCORIDES won't review a PR that doesn't pass checks.

### @DIOSCORIDES asked for changes

**What to do**: This is normal! Here's the process:

1. Read their comment carefully—they'll tell you exactly what needs to change
2. Click the **Files changed** tab to see what they flagged
3. Click the **Edit** button to make the requested changes
4. Save and resubmit (GitHub will update your existing pull request, no need to create a new one)
5. Add a comment: "Done! I've made the requested changes."

### My changes were declined

**What to do**: This means the information didn't meet quality standards. Here's what to do:

1. Read @DIOSCORIDES's comment explaining why
2. Gather better information (verify the website, confirm coordinates, etc.)
3. When you're ready, create a new pull request with improved data
4. Reference the original PR in your description: "This improves on PR #123 with verified coordinates"

### The dashboard looks broken after my changes were approved

**What to do**: Don't worry—this is rare. Here's how to investigate:

1. Go to your merged pull request on GitHub
2. Click **Commits** to see exactly what changed
3. Wait 10-15 minutes (the deployment may still be in progress)
4. Check the **Actions** tab to see if the deployment succeeded
5. If there's an error, contact your repository administrator

!!! tip "Pro Tip: Always Make a Backup"
    Before making big changes, select all the data, copy it, and paste it into a text file on your computer. If something goes wrong, you'll have a backup to restore from.

## Best Practices

- **Be specific in descriptions**: Instead of "update data," write "Added City Library in Paris with IIIF support and corrected coordinates"
- **Test URLs before submitting**: Click the website link in your browser to make sure it works
- **One change at a time**: If you need to add 5 new libraries, do it in one pull request (but one at a time is easier to review)
- **Double-check spelling**: Library names and city names should match official sources
- **Use accurate coordinates**: If you provide lat/lng, make sure they're correct (use Google Maps to verify)
- **Check the checklist**: Before submitting, make sure you've verified all three items in the PR checklist
- **Be patient with review**: @DIOSCORIDES may take 24-48 hours to respond

## Need Help?

- **Questions about a specific field?** Check the [Data Schema](index.md#data-schema) section in the overview
- **Confused about a value like "IIIF"?** See the [About IIIF](index.md#about-iiif) section
- **Need technical support?** Contact your repository administrator

## What's Next?

Once you're comfortable updating data, you might want to:

- Learn about [Contributing](contributing.md) to other parts of the project
- Explore the full [Dashboard](../index.html) to see how your data appears
- Read [About the Project](about.md) for context on DMMapp

Happy updating! 🎉
