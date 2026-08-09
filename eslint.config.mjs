import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
	...nextVitals,
	{ rules: { 'react-hooks/immutability': 'off' } },
	globalIgnores(['.next/**']),
]);
