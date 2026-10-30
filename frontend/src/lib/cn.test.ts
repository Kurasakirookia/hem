import { expect, test } from 'vitest'
import { cn } from './cn'

test('lets a later Tailwind class win over an earlier conflicting one', () => {
  // Arrange
  const base = 'px-5 text-brand'
  const override = 'px-8'

  // Act
  const result = cn(base, override)

  // Assert
  expect(result).toBe('text-brand px-8')
})

test('drops falsy values so conditional classes read cleanly', () => {
  // Arrange
  const isActive = false

  // Act
  const result = cn('block', isActive && 'bg-brand', undefined)

  // Assert
  expect(result).toBe('block')
})
