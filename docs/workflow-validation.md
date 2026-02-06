# Data Validation Workflow Documentation

## Overview

The Data Guardrails workflow is a GitHub Actions automation that validates the `data.json` file before changes are merged into the main branch. This ensures data quality and prevents schema violations.

## Purpose

The workflow serves as an automated quality gate that:

- Prevents invalid data from entering the repository
- Ensures consistency across all manuscript library records
- Validates schema compliance automatically
- Reduces manual review burden on maintainers
- Provides immediate feedback to contributors

## How It Works

### Trigger Conditions

The workflow runs in two scenarios:

1. **Automatic execution**: When a pull request includes changes to `data.json`
2. **Manual execution**: When triggered from the GitHub Actions tab using the "Run workflow" button

### Validation Process

The workflow performs two levels of validation:

#### Level 1: JSON Syntax Validation

**Tool**: Python's `json.tool` module

**Purpose**: Verifies that the JSON file is well-formed and parseable.

**What it checks**:

- Proper bracket and brace matching
- Correct comma placement
- Valid string escaping
- No trailing commas
- Proper encoding (UTF-8)

!!! failure "Example: Missing comma"

    ```json
    {
      "library": "Example"
      "nation": "Country"
    }
    ```

!!! failure "Example: Trailing comma"

    ```json
    {
      "library": "Example",
    }
    ```

#### Level 2: Schema Validation

**Tool**: AJV (Another JSON Validator) with format support

**Purpose**: Validates that all records conform to the defined schema structure.

**What it checks**:

1. **Required Fields**
   - All 10 required fields are present in every record
   - No missing `id`, `library`, `nation`, etc.

2. **Data Types**
   - Strings are strings (not numbers or booleans)
   - Booleans are true/false (not "true"/"false" strings)
   - Integers are whole numbers

3. **Format Validation**
   - `website` field contains valid URIs
   - `is_part_of_url` contains valid URIs when present
   - URIs follow proper format: `scheme://host/path`

4. **Conditional Requirements**
   - When `is_part_of` is `true`, both `is_part_of_project_name` and `is_part_of_url` must be non-null
   - When `is_part_of` is `false`, project fields can be null

5. **Enumerated Values**
   - `quantity` must be one of: "Few", "Dozens", "Hundreds", "Thousands", "Unknown"

!!! failure "Example: Schema violations"

    ```json
    {
      "id": 1,
      "library": "Example Library",
      "nation": "Country",
      "city": "City",
      "website": "not-a-valid-url",
      "iiif": "false",
      "quantity": "Many"
    }
    ```
    
    **Issues**:
    
    - `website`: Invalid URI format
    - `iiif`: Should be boolean, not string
    - `quantity`: Not in allowed enum values

## Workflow Steps

The workflow executes the following steps in sequence:

### Step 1: Checkout Code
```yaml
- name: Checkout Code
  uses: actions/checkout@v3
```

**Purpose**: Downloads the repository code to the GitHub Actions runner.

**Why needed**: The workflow needs access to `data.json` and `schema.json` to perform validation.

### Step 2: Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'
```

**Purpose**: Installs Node.js runtime environment.

**Why needed**: AJV validator is a Node.js package and requires Node.js to run.

**Version**: Uses Node.js 16 for stability and compatibility.

### Step 3: Install Validators
```yaml
- name: Install Validator & Formats
  run: npm install -g ajv-cli ajv-formats
```

**Purpose**: Installs the validation tools.

**Packages installed**:
- `ajv-cli`: Command-line interface for AJV validator
- `ajv-formats`: Adds format validation (uri, email, date, etc.)

**Flags**:
- `-g`: Global installation (available system-wide)

### Step 4: Run Validation
```yaml
- name: Validate JSON Syntax & Schema
  run: |
    cat data.json | python3 -m json.tool > /dev/null
    ajv validate -s schema.json -d data.json -c ajv-formats
```

**Purpose**: Executes the actual validation checks.

**Commands**:
1. `cat data.json | python3 -m json.tool > /dev/null`
   - Pipes data.json through Python's JSON parser
   - Discards output (`> /dev/null`), only checks for errors
   - Exits with error code if JSON is malformed

2. `ajv validate -s schema.json -d data.json -c ajv-formats`
   - `-s schema.json`: Specifies the schema file
   - `-d data.json`: Specifies the data file to validate
   - `-c ajv-formats`: Enables format validation plugin

## Exit Codes

The workflow uses exit codes to signal success or failure:

- **Exit 0**: All validations passed
  - Pull request can be merged
  - Green checkmark appears in GitHub
  
- **Exit 1**: Validation failed
  - Pull request is blocked
  - Red X appears in GitHub
  - Error details shown in workflow logs

## Reading Validation Errors

When validation fails, the workflow logs provide detailed error messages.

!!! example "JSON Syntax Error"

    ```
    Expecting ',' delimiter: line 45 column 3 (char 1234)
    ```
    
    **Solution**: Add missing comma on line 45.

!!! example "Schema Validation Errors"

    ```
    data/123 must have required property 'iiif'
    ```
    
    **Solution**: Add the missing `iiif` field to record at index 123.
    
    ```
    data/456/website must match format "uri"
    ```
    
    **Solution**: Fix the `website` field in record 456 to be a valid URL.
    
    ```
    data/789 must match "then" schema
    data/789/is_part_of_project_name must NOT have fewer than 1 characters
    ```
    
    **Solution**: Record 789 has `is_part_of: true` but missing or empty `is_part_of_project_name`.

## Common Validation Failures

!!! failure "Missing Required Field"

    ```json
    {
      "id": 1,
      "library": "Example"
    }
    ```
    
    **Missing**: `nation`, `city`, `website`, `copyright`, `quantity`, `iiif`, `is_free_cultural_works_license`, `is_part_of`

!!! failure "Invalid Boolean Type"

    ```json
    {
      "iiif": "false"
    }
    ```
    
    **Issue**: String instead of boolean  
    **Fix**: `"iiif": false`

!!! failure "Invalid URI Format"

    ```json
    {
      "website": "www.example.com"
    }
    ```
    
    **Issue**: Missing protocol  
    **Fix**: `"website": "https://www.example.com"`

!!! failure "Invalid Quantity Value"

    ```json
    {
      "quantity": "Some"
    }
    ```
    
    **Issue**: Not in enum  
    **Fix**: `"quantity": "Few"` (or "Dozens", "Hundreds", "Thousands", "Unknown")

!!! failure "Incomplete Project Information"

    ```json
    {
      "is_part_of": true,
      "is_part_of_project_name": null,
      "is_part_of_url": null
    }
    ```
    
    **Issue**: Cannot be null when `is_part_of` is true  
    **Fix**: Provide both project name and URL, or set `is_part_of: false`

## Manual Workflow Execution

To manually trigger the workflow:

1. Navigate to your repository on GitHub
2. Click the **Actions** tab
3. Select **Data Guardrails** from the workflow list
4. Click **Run workflow** button
5. Select the branch to test
6. Click **Run workflow**

This is useful for:
- Testing schema changes
- Validating data before creating a pull request
- Running validation on-demand without a pull request

## Integration with Pull Requests

When a pull request modifies `data.json`:

1. Workflow automatically triggers
2. Validation runs in the background
3. Results appear as a check in the PR
4. **Pass**: Green checkmark, PR can be merged
5. **Fail**: Red X, PR blocked until fixed

### Branch Protection

To enforce validation, configure branch protection rules:

1. Go to repository **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable **Require status checks to pass before merging**
4. Select **Data Guardrails** / **validate-data**

This prevents merging invalid data into the main branch.

## Maintenance

### Updating Node.js Version

To update the Node.js version:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18'
```

Update the `node-version` value to your desired version.

**Recommendation**: Use LTS (Long-Term Support) versions for stability.

### Updating Actions Versions

Check for updates to GitHub Actions:

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
```

For example, update from v3 to v4 when new versions are available.

**Best practice**: Review changelogs before updating to avoid breaking changes.

### Adding Additional Checks

To add more validation steps, append to the validation command:

```yaml
- name: Validate JSON Syntax & Schema
  run: |
    cat data.json | python3 -m json.tool > /dev/null
    ajv validate -s schema.json -d data.json -c ajv-formats
    python3 scripts/custom-validation.py data.json
```

This example shows adding a custom Python validation script.

## Performance

**Typical execution time**: 20-40 seconds

**Breakdown**:
- Checkout code: 5-10 seconds
- Setup Node.js: 5-10 seconds
- Install validators: 5-10 seconds
- Run validation: 5-10 seconds

**Cost**: Free on GitHub Actions (included in free tier)

## Troubleshooting

### Workflow Doesn't Trigger

**Check**:
- Pull request modifies `data.json` file
- Workflow file exists in `.github/workflows/` folder
- Workflow file is valid YAML syntax

### Validation Passes Locally but Fails in CI

**Possible causes**:
- Line ending differences (CRLF vs LF)
- File encoding issues
- Different AJV versions

**Solution**: Run `fix-data.js` to normalize the data.

### Cannot Install NPM Packages

**Possible causes**:
- Network connectivity issues
- npm registry down
- Package version conflicts

**Solution**: Check GitHub Actions status page or retry workflow.

## Related Files

- `.github/workflows/validate.yml` - The workflow definition
- `schema.json` - The JSON schema definition
- `SCHEMA.md` - Schema documentation
- `data.json` - The validated data file
- `fix-data.js` - Data cleanup script

## Best Practices

1. **Run `fix-data.js` before committing** to catch issues early
2. **Test schema changes locally** before updating schema.json
3. **Keep schema.json and data.json in sync** with documentation
4. **Review validation errors carefully** before force-pushing fixes
5. **Update workflow annually** to use latest Action versions

## Support

If validation fails and you cannot determine the cause:

1. Review the workflow logs for detailed error messages
2. Validate `data.json` locally using the same commands
3. Check `SCHEMA.md` for field requirements
4. Consult the schema.json file for exact specifications
5. Run `fix-data.js` to autocorrect common issues

---

**Last Updated**: February 6, 2026
**Workflow Version**: 1.0  
**Maintained By**: DMMapp Contributors
