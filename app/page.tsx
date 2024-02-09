'use client'

import LeftSidebar from '@/components/LeftSidebar'
import Live from '@/components/Live'
import Navbar from '@/components/Navbar'
import RightSidebar from '@/components/RightSidebar'
import {
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvaseMouseMove,
  handleResize,
  initializeFabric
} from '@/lib/canvas'
import { useMutation, useStorage } from '@/liveblocks.config'
import { ActiveElement } from '@/types/type'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('rectangle')

  const activeObjectRef = useRef<fabric.Object | null>(null)
  const canvasObjects = useStorage(root => root.canvasObjects)

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return
    const { objectId } = object

    const shapeData = object.toJSON()

    shapeData.objectId = objectId

    const canvasObjects = storage.get('canvasObjects')

    canvasObjects.set(objectId, shapeData)
  }, [])

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: ''
  })

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element)

    selectedShapeRef.current = element?.value as string
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })

    canvas.on('mouse:down', options => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })

    canvas.on('mouse:move', options => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage
      })
    })

    canvas.on('mouse:up', options => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef
      })
    })

    window.addEventListener('resize', () => {
      handleResize({ fabricRef })
    })
  }, [])

  return (
    <main className={'h-screen overflow-hidden'}>
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement} />
      <section className='flex h-full flex-row'>
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  )
}
function handleCanvaseMouseUp(arg0: {
  options: any
  canvas: any
  isDrawing: import('react').MutableRefObject<boolean>
  shapeRef: import('react').MutableRefObject<any>
  selectedShapeRef: import('react').MutableRefObject<string | null>
  syncShapeInStorage: (object: any) => void
}) {
  throw new Error('Function not implemented.')
}
