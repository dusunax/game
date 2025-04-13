export const renderSprite = (texture: string): Matter.IBodyRenderOptions => ({
  sprite: {
    texture,
    xScale: 1,
    yScale: 1,
  },
});
