// Barrel exports para componentes padronizados

// Layout Components
export { default as StandardPageLayout } from './Layout/StandardPageLayout';
export type { StandardPageLayoutProps, PageAction } from './Layout/StandardPageLayout';

// Table Components
export { default as StandardTable } from './Table/StandardTable';
export type { StandardTableProps, ActionButton } from './Table/StandardTable';
export {
  createEditAction,
  createViewAction,
  createConfigAction,
  createDeleteAction,
} from './Table/StandardTable';

// Hooks
export { default as useStandardTable } from '../hooks/useStandardTable';
export type { UseStandardTableOptions, UseStandardTableReturn } from '../hooks/useStandardTable';