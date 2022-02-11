import { Lecture } from '../../src/entities'
import { ExistingElementError } from '../../src/entities/errors/exisiting-element-error'
import { UnexistingElementError } from '../../src/entities/errors/unexisting-element-error'
import { Link } from '../../src/entities/link'
import { Material } from '../../src/entities/material'
import { Pdf } from '../../src/entities/pdf'

describe('Lecture', () => {
  it('should be able to add further material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    lecture.add(branchingPdf)
    expect(lecture.includes(branchingPdf)).toBeTruthy()
  })

  it('should be able to remove further material from lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    lecture.add(branchingPdf)
    lecture.remove(branchingPdf)
    expect(lecture.includes(branchingPdf)).toBeFalsy()
  })

  it('should not be able to remove unexisting material from lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    const error = lecture.remove(branchingPdf).value
    expect(error).toBeInstanceOf(UnexistingElementError)
  })

  it('should be able to add further links to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingLink: Material = new Link('Branching', 'https://page.com/branching.html')
    lecture.add(branchingLink)
    expect(lecture.includes(branchingLink)).toBeTruthy()
  })

  it('should not be able to add existing material in lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingLink: Material = new Link('Branching', 'https://page.com/branching.html')
    lecture.add(branchingLink)
    const error = lecture.add(branchingLink).value
    expect(lecture.includes(branchingLink)).toBeTruthy()
    expect(error).toBeInstanceOf(ExistingElementError)
  })

  it('should not be able to determine position of unexisting material', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingLink: Material = new Link('Branching', 'https://page.com/branching.html')
    const error = lecture.position(branchingLink).value
    expect(error).toBeInstanceOf(UnexistingElementError)
  })

  it('should be able to move further material', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingLink: Material = new Link('Branching link', 'https://page.com/branching.html')
    const branchingPdf: Material = new Pdf('Branching pdf', 'https://storage/branching.pdf')
    lecture.add(branchingLink)
    lecture.add(branchingPdf)
    lecture.move(branchingLink, 2)

    expect(lecture.position(branchingPdf).value).toEqual(1)
    expect(lecture.position(branchingLink).value).toEqual(2)
  })
})
