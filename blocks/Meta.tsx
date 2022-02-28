import { FC, useContext, useEffect } from 'react';
import { ComponentAnnotations } from '@storybook/csf';
import { DocsContext } from './DocsContext';

interface MetaProps {
  of: ComponentAnnotations;
}

export const Meta: FC<MetaProps> = ({ of }) => {
  const { meta, setMeta } = useContext(DocsContext);
  useEffect(() => {
    if (!meta) setMeta(of);
  }, [of]);
  return null;
};
