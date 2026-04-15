import { _decorator, Camera, Component, Node, Vec3, screen, log, view, Enum } from 'cc';

export enum ScreenEdge {
    Left = 0,
    Right = 1,
    Top = 2,
    Bottom = 3
}
// It registers the enum with Cocos so the editor can build a dropdown UI
Enum(ScreenEdge);

export function getScreenEdgeForOrthoCam(cam: Camera, dir = ScreenEdge.Left): number {
    const visibleSize = view.getVisibleSize();
    const aspect = visibleSize.width / visibleSize.height;
    const halfWidth = cam.orthoHeight * aspect;

    const leftEdgeX = cam.node.worldPosition.x - halfWidth;
    const rightEdgeX = cam.node.worldPosition.x + halfWidth;
    const topEdgeY = cam.node.worldPosition.y + cam.orthoHeight;
    const bottomEdgeY = cam.node.worldPosition.y - cam.orthoHeight;

    switch (dir) {
        case ScreenEdge.Left:
            return leftEdgeX;
        case ScreenEdge.Right:
            return rightEdgeX;
        case ScreenEdge.Top:
            return topEdgeY;
        case ScreenEdge.Bottom:
            return bottomEdgeY;
        default:
            return leftEdgeX;
    }
}
