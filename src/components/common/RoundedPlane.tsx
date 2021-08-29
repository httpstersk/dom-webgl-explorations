import type { MeshProps } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh, Shape, ShapeGeometry } from 'three';

const RoundedPlane: React.FC<MeshProps> = ({
  args,
  children: material,
  radius = 0.064,
  ...rest
}) => {
  const mesh = useRef<Mesh>();

  const geometry = React.useMemo(() => {
    const height = 1;
    const width = 1;
    const x = 0;
    const y = 0;

    const shape = new Shape()
      .moveTo(x, y + radius)
      .lineTo(x, y + height - radius)
      .quadraticCurveTo(x, y + height, x + radius, y + height)
      .lineTo(x + width - radius, y + height)
      .quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      .lineTo(x + width, y + radius)
      .quadraticCurveTo(x + width, y, x + width - radius, y)
      .lineTo(x + radius, y)
      .quadraticCurveTo(x, y, x, y + radius);

    const geom = new ShapeGeometry(shape, 64);
    geom.center();
    return geom;
  }, [radius]);

  return (
    <mesh geometry={geometry} ref={mesh} {...rest}>
      {material}
    </mesh>
  );
};

export { RoundedPlane };
