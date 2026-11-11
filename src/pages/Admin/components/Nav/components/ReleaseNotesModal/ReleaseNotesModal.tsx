import './ReleaseNotesModal.css'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { useToggle } from '@/pages/Admin/hooks/useToggle.hook'
import { Icon } from '@/components'
import Note, { NoteProps } from './components/Note/Note'
import { clsx, safe } from '@/helpers'
import { lastSeenVersionEntity } from '@/pages/Admin/services/localStorage/entities/lastSeenVersion'
import changelogRaw from '@/../CHANGELOG.md?raw'
import pkg from '@/../package.json'
import { Button } from '@/shared/components/Button/Button'

const parseChangelog = (md: string) => {
  const normalized = md.replace(/\r\n/g, '\n')

  // Añade un sentinel al final para asegurar un límite claro
  const sentinel = '\n## __END__'
  const source = normalized.endsWith('\n')
    ? normalized + '## __END__'
    : normalized + sentinel

  const versionRegex =
    /^## `(.*?)` - ([^\n]+)\n([\s\S]*?)(?=^## |\n## __END__)/gm

  const entries: NoteProps[] = []
  let match: RegExpExecArray | null

  while ((match = versionRegex.exec(source)) !== null) {
    const [, version, date, content] = match
    entries.push({ version, date, content })
  }

  return entries
}

const compareVersions = (v1: string, v2?: string) => {
  if (!v2) return 1
  const a = v1.split('.').map(Number)
  const b = v2.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if ((a[i] ?? 0) > (b[i] ?? 0)) return 1
    if ((a[i] ?? 0) < (b[i] ?? 0)) return -1
  }
  return 0
}

const iser = (v1: string, v2?: string) => compareVersions(v1, v2) === 1

const createIcon = (iconClass: string) => {
  const icon = window.document.createElement('i')
  icon.classList.add('cmp-icon', 'fa-solid', iconClass)
  return icon
}

const TYPES_MATCHER: Record<string, HTMLElement> = {
  'Nuevas funcionalidades': createIcon('fa-plus'), // feat
  Mejoras: createIcon('fa-wrench'), // impr
  Correcciones: createIcon('fa-bug'), // fix
  Obsoleto: createIcon('fa-ban'), // depr
}

const ReleaseNotesModal = () => {
  const [lastSeenVersion, setLastSeenVersion] = useState(
    safe(() => lastSeenVersionEntity.state).result,
  )

  useEffect(() => {
    if (lastSeenVersion) lastSeenVersionEntity.state = lastSeenVersion
  }, [lastSeenVersion])

  const [{ newEntries, oldEntries }] = useState(() => {
    const [latest, ...restEntries] = parseChangelog(changelogRaw)

    const newEntries = [
      latest,
      ...restEntries.filter(v => iser(v.version, lastSeenVersion)),
    ]

    const oldEntries = restEntries.filter(
      v => !iser(v.version, lastSeenVersion),
    )

    return { newEntries, oldEntries }
  })

  const [newNotes, setNotes] = useState(newEntries)
  const [oldNotes, setOldNotes] = useState(oldEntries)

  const [oldsExpanded, handleToggleClick, setOldsExpanded] = useToggle()

  const handleClose = useCallback(() => {
    const latestVersion = newNotes[0].version
    setLastSeenVersion(latestVersion)
    setOldsExpanded(false)

    if (1 < newNotes.length) {
      const [currentVersionNote, ...rest] = newNotes

      setNotes([currentVersionNote])
      setOldNotes(prev => [...rest, ...prev])
    }
  }, [newNotes, setOldsExpanded])

  const handleDialogClick = useCallback<MouseEventHandler<HTMLElement>>(
    e => {
      const element = e.target as HTMLElement
      if (element.id !== 'notes-modal') return

      const dialog = element as HTMLDialogElement
      handleClose()
      dialog.close()
    },
    [handleClose],
  )

  useEffect(() => {
    const notes = window.document.querySelectorAll('.notes')

    notes.forEach(note => {
      const h3Elements = note.querySelectorAll('h3')

      h3Elements.forEach(h3 => {
        if (h3.children.length) return
        const icon = TYPES_MATCHER[h3.textContent]
        icon && h3.prepend(icon.cloneNode())
      })
    })
  }, [oldNotes, newNotes])

  // TODO: abrir modal automáticamente si hay una nueva versión disponible
  // const newVersionAvailable =
  //   compareVersions(pkg.version, lastSeenVersion) === 1

  return (
    <div className="cmp-release-notes-modal">
      <Button
        text={`v${pkg.version}`}
        size="s"
        border
        htmlAttrs={{ commandfor: 'notes-modal', command: 'show-modal' }}
      />
      <dialog id="notes-modal" onClick={handleDialogClick}>
        <div className="content">
          <header>
            <h2>Notas de versión</h2>
          </header>
          {newNotes.length !== 0 && (
            <section className="news notes">
              {newNotes.map(note => (
                <Note key={note.version} {...note} />
              ))}
            </section>
          )}
          {oldNotes.length !== 0 && (
            <section className={clsx('olds', { 'is-expanded': oldsExpanded })}>
              <div className="notes">
                {oldNotes.map(note => (
                  <Note key={note.version} {...note} />
                ))}
              </div>
              <button onClick={handleToggleClick}>
                {oldsExpanded
                  ? 'Cerrar versiones pasadas'
                  : 'Versiones pasadas'}
                <Icon iconClass="fa-solid fa-angle-down" />
              </button>
            </section>
          )}
        </div>
      </dialog>
    </div>
  )
}

export default ReleaseNotesModal
