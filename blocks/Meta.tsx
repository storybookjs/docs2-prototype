import { FC, useContext } from 'react';
import { BaseAnnotations } from '@storybook/csf';
import { DocsContext } from './DocsContext';

interface MetaProps {
  of: BaseAnnotations;
}

export const Meta: FC<MetaProps> = ({ of }) => {
  const { meta, setMeta } = useContext(DocsContext);
  if (!meta) {
    setMeta(of);
  }
  return null;
};
