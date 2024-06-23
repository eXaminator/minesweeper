type Props = { text: string, onAction?: () => void, buttonLabel?: string };

export default function Message(props: Props) {
    const { text, onAction, buttonLabel } = props;

    return (
        <div style={{
            position: 'absolute',
            background: 'RGBA(0,0,0,.7)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h2>{text}</h2>
            {onAction && buttonLabel && <button onClick={onAction}>{buttonLabel}</button>}
        </div>
    );
}