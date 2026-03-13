# Testing Guide for Forecast4U Weather App

## How to Run Tests

### 1. Run Tests Once
```bash
npm run test -- --run
```
This runs all tests once and shows results in the terminal.

### 2. Watch Mode (Auto-run on file changes)
```bash
npm run test:watch
```
- Tests automatically re-run when you save files
- Keeps running in the background
- Press `q` to quit

### 3. Interactive UI Mode
```bash
npm run test:ui
```
- Opens a browser-based test UI
- Visual interface to see test results
- Can filter and search tests

### 4. Coverage Report
```bash
npm run test:coverage
```
- Shows how much of your code is tested
- Generates coverage report in `coverage/` folder

## Checking Test Results

### In Terminal
After running tests, you'll see output like:
```
✓ src/App.test.jsx (18 tests) 1640ms

Test Files  1 passed (1)
     Tests  18 passed (18)
```

### Understanding Results
- ✓ Green checkmark = Test passed
- ✗ Red X = Test failed  
- Number in parentheses = Test count
- Duration = How long tests took

### When Tests Fail
Failed tests show:
- Which test failed
- Expected vs actual values
- File and line number
- Error message

Example:
```
✗ should display forecast data
  Expected: "clear sky"
  Received: undefined
  
  at src/App.test.jsx:145:23
```

## Pre-commit Hook

Tests run automatically before every commit:
```bash
git commit -m "Add new feature"
# Tests run automatically...
# If pass: commit proceeds
# If fail: commit blocked
```

To bypass (not recommended):
```bash
git commit -m "message" --no-verify
```

## Test File Location

All tests are in: `src/App.test.jsx`

## Current Test Coverage

The test suite covers:
1. **Initial Render** (7 tests)
   - UI elements display correctly
   - Default values
   
2. **User Interactions** (3 tests)
   - Typing in inputs
   - Button clicks
   - Clear functionality

3. **Dark Mode** (2 tests)
   - Toggle on/off
   
4. **API Calls** (4 tests)
   - Successful fetch
   - Error handling
   - Network errors
   - Correct endpoints

5. **Forecast Display** (2 tests)
   - Data grouping
   - Icon rendering

**Total: 18 tests**

## Tips

- Run tests before committing manually: `npm run test -- --run`
- Use watch mode during development: `npm run test:watch`
- Check test UI for visual feedback: `npm run test:ui`
- Review coverage to find untested code: `npm run test:coverage`

## Debugging Failed Tests

1. Read the error message carefully
2. Check file and line number
3. Verify expected vs received values
4. Run single test file: `npm run test src/App.test.jsx`
5. Use `console.log()` in tests for debugging
