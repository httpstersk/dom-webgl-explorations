import { CONSTANTS } from '@/constants';
import useStore from '@/helpers/store';
import { A11yUserPreferences } from '@react-three/a11y';
import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Scene = ({ children, isSquare }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2] }}
      dpr={[1, 2]}
      linear
      mode="concurrent"
      onCreated={({ events }) => useStore.setState({ events })}
      orthographic
      style={{
        cursor: 'pointer',
        inset: 0,
        margin: 'auto',
        maxWidth: isSquare ? CONSTANTS.SIZES.INSTAGRAM : 'none',
        position: 'fixed',
      }}
    >
      <A11yUserPreferences>
        <Preload all />
        {children}
      </A11yUserPreferences>
    </Canvas>
  );
};

export default Scene;
