import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'

export default function CursorChat({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence
}: CursorChatProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateMyPresence({ message: e.target.value })
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setCursorState({
        mode: CursorMode.Chat,
        // @ts-ignore
        previousMessage: cursorState.message,
        message: ''
      })
    } else if (e.key === 'Escape') {
      setCursorState({
        mode: CursorMode.Hidden
      })
    }
  }

  return (
    <div
      className='absolute top-0 left-0'
      style={{
        transform: `translatex(${cursor.x}px) translatey(${cursor.y}px)`
      }}
      onKeyUp={e => e.stopPropagation()}
    >
      {/* Show message input when cursor is in chat mode */}
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color={'#000'} />

          <div
            className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'
            onKeyUp={e => e.stopPropagation()}
          >
            {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
            <input
              className={
                'z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none'
              }
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? '' : 'Type a message...'}
              value={cursorState.message}
              maxLength={50}
              onKeyUp={e => e.stopPropagation()}
            />
          </div>
        </>
      )}
    </div>
  )
}
