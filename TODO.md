# Task: Implement Back Button Navigation

## Steps to Complete:

1. **Update src/App.tsx**:
   - Add history state: `const [sectionHistory, setSectionHistory] = useState<string[]>(['home']);`
   - Create `navigateToSection` function: Push new section to history and set currentSection.
   - Create `goBack` function: If history length > 1, pop and set previous section.
   - Update all `setCurrentSection` calls to use `navigateToSection`.
   - Pass `goBack` prop to section components: VaccineSection, BlogSection, ContactSection, CategorySection.
   - For FeedsSection (inline), add back button logic.

2. **Update src/components/Header.tsx**:
   - Replace direct `setCurrentSection` calls with `navigateToSection`.
   - Update submenu navigation calls accordingly.

3. **Update src/components/Hero.tsx**:
   - Replace `setCurrentSection('contact')` with `navigateToSection('contact')`.

4. **Update src/components/FeaturedProducts.tsx** (if needed):
   - Check and update any navigation calls to use `navigateToSection`.

5. **Add back button to src/components/VaccineSection.tsx**:
   - Add `goBack: () => void` to props.
   - Add back button at top-left: ChevronLeft icon, onClick={goBack}, visible if currentSection !== 'home'.

6. **Add back button to src/components/BlogSection.tsx**:
   - Add `goBack: () => void` to props.
   - Add back button at top-left: ChevronLeft icon, onClick={goBack}.

7. **Add back button to src/components/ContactSection.tsx**:
   - Add `goBack: () => void` to props.
   - Add back button at top-left: ChevronLeft icon, onClick={goBack}.

8. **Add back button to src/components/CategorySection.tsx** (for shop):
   - Add `goBack: () => void` to props.
   - Add back button at top-left: ChevronLeft icon, onClick={goBack}.

9. **Update src/App.tsx for FeedsSection**:
   - Add back button in FeedsSection component.

10. **Test the implementation**:
    - Run `npm run dev`.
    - Navigate to sections and verify back button works.
    - Check history stack doesn't go below 'home'.

## Progress:
- [x] Step 1: Update App.tsx
- [x] Step 2: Update Header.tsx
- [x] Step 3: Update Hero.tsx
- [x] Step 4: Update FeaturedProducts.tsx
- [x] Step 5: Update VaccineSection.tsx
- [ ] Step 6: Update BlogSection.tsx
- [ ] Step 7: Update ContactSection.tsx
- [ ] Step 8: Update CategorySection.tsx
- [ ] Step 9: Update FeedsSection in App.tsx
- [ ] Step 10: Test
