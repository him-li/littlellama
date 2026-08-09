/**
 * Compatibility surface for components migrated from MUI 5 to MUI 9.
 *
 * MUI 9 removed legacy system props (for example `mt`, `gap`, and `item`).
 * Keeping the bridge in one module preserves the existing UI while new and
 * touched components can move those values into `sx` and adopt the new Grid API.
 */
import * as Mui from '@mui/material';

const components = Mui as Record<string, any>;

export const {
	Accordion, AccordionDetails, AccordionSummary, Alert, AppBar, Avatar,
	Backdrop, Box, Button, ButtonGroup, Card, CardActionArea, CardActions,
	CardContent, CardMedia, Checkbox, Chip, Container, FormControlLabel, Grid,
	IconButton, InputBase, Link, List, ListItem, ListItemIcon, ListItemText,
	Menu, MenuItem, Modal, NativeSelect, Paper, Slide, Snackbar, Stack, Step,
	StepLabel, Stepper, Tab, Tabs, TextField, Toolbar, Tooltip, Typography,
	useScrollTrigger,
} = components;
