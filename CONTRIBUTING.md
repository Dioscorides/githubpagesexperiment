# Contributing to DMMapp Directory

Thanks for helping us map the world's manuscripts! We manage this data as a simple JSON file (`data.json`).

## How to Add a Library
1. **Search First**: Ensure the library isn't already listed.
2. **Edit `data.json`**: Add your entry to the bottom of the list.
3. **Follow the Format**:
   - **Booleans**: Use `true` or `false` (not 0/1).
   - **Coordinates**: Use decimal degrees (e.g., "41.9028") as strings.
   - **IIIF**: Only set to `true` if they have a functional IIIF Manifest/Viewer.

## Pull Request Process
- Create a new branch for your changes.
- Submit a Pull Request (PR) to the `master` branch.
- **Wait for Checks**: Our robot will automatically check your JSON syntax. If it fails, please fix the errors shown in the "Checks" tab.
