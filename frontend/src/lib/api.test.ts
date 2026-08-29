import { describe, expect, test, vi } from 'vitest'
import { ENDPOINTS, api } from './api'

describe('api', () => {
  test('prefixes the endpoint with /api and keeps it relative', async () => {
    // Arrange
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ status: 'ok' }) })
    vi.stubGlobal('fetch', fetchMock)

    // Act
    await api(ENDPOINTS.health)

    // Assert - relative, so no host or port is ever embedded
    expect(fetchMock).toHaveBeenCalledWith('/api/health', expect.anything())
  })

  test('throws with the method and path when the response is not ok', async () => {
    // Arrange
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))

    // Act + Assert
    await expect(api(ENDPOINTS.health)).rejects.toThrow('GET /api/health failed: 404')
  })
})
