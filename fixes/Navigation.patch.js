// Navigation.patch.js - patch suggestion for src/components/Navigation.js
// Apply these changes to the Navigation component to improve dropdown behavior and accessibility.

// --- PATCH START ---
// In the Navigation component, ensure dropdown toggle updates aria-expanded and computes panel alignment.

// Example change inside handleDropdownToggle (replace or augment existing function):

const handleDropdownToggle = (id) => {
  setDropdownOpen(prev => {
    const opening = prev !== id;
    const newVal = opening ? id : null;
    // After state update, compute alignment on next tick
    setTimeout(() => {
      const parent = document.querySelector(`[data-nav-id="${id}"]`);
      if (!parent) return;
      const panel = parent.querySelector('.dropdown-panel');
      const trigger = parent.querySelector('.nav-link');
      if (trigger) trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
      if (opening && panel) {
        const rect = panel.getBoundingClientRect();
        if (rect.right > window.innerWidth - 8) panel.classList.add('align-right'); else panel.classList.remove('align-right');
      }
    }, 0);
    return newVal;
  });
};

// And in the JSX markup for each NavItem, add a data attribute and ensure the trigger has keyboard handlers:

// <NavItem key={item.id} data-nav-id={item.id}>
//   <NavLink
//     ...
//     role="button"
//     tabIndex={0}
//     aria-haspopup={item.dropdown ? 'true' : undefined}
//     aria-expanded={dropdownOpen === item.id ? 'true' : 'false'}
//     onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.dropdown ? handleDropdownToggle(item.id) : handleMenuClick(item.id); } }}
//   >
// --- PATCH END ---

// Note: This file is a patch suggestion. If you want, I can apply the exact edits to src/components/Navigation.js in the branch as a replacement commit.