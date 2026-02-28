# How to Add Team Member Images

## Step 1: Add Images to Assets Folder
Place your team member images in: `src/assets/team/`

Recommended image names:
- `avinash-sanap.jpg` - Managing Director
- `sheetal-sanap.jpg` - Director
- `ashutosh-sanap.jpg` - Executive Director
- `om-sanap.jpg` - Director

## Step 2: Update About.tsx

Add these imports at the top of `src/pages/About.tsx`:

```typescript
import avinashImage from "@/assets/team/avinash-sanap.jpg";
import sheetalImage from "@/assets/team/sheetal-sanap.jpg";
import ashutoshImage from "@/assets/team/ashutosh-sanap.jpg";
import omImage from "@/assets/team/om-sanap.jpg";
```

## Step 3: Replace Placeholder Divs

### For Avinash Sanap (line ~35):
Replace:
```tsx
<div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
  <Users className="w-20 h-20 text-primary" />
</div>
```

With:
```tsx
<img src={avinashImage} alt="Avinash Sanap" className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-4" />
```

### For Sheetal Sanap (line ~55):
Replace:
```tsx
<div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
  <Heart className="w-20 h-20 text-accent" />
</div>
```

With:
```tsx
<img src={sheetalImage} alt="Sheetal Avinash Sanap" className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-4" />
```

### For Ashutosh Sanap (line ~75):
Replace:
```tsx
<div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
  <Target className="w-20 h-20 text-primary" />
</div>
```

With:
```tsx
<img src={ashutoshImage} alt="Ashutosh Avinash Sanap" className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-4" />
```

### For Om Sanap (line ~95):
Replace:
```tsx
<div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
  <Globe2 className="w-20 h-20 text-accent" />
</div>
```

With:
```tsx
<img src={omImage} alt="Om Avinash Sanap" className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-4" />
```

## Image Requirements
- Format: JPG or PNG
- Recommended size: 500x500px or larger (square)
- Professional headshots work best
- Good lighting and clear background preferred
