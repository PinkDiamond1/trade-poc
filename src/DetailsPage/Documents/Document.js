import React, { useEffect, useState } from 'react';
import { TableRow, TableColumn, FontIcon } from 'react-md';
import { validateIntegrity } from './DocumentIntegrityValidator';

const Document = (props) => {

  const [document, setDocument] = useState(null);

  useEffect(() => {
    validate(props.document);
  }, [props.document])

  const validate = async document => {
    const result = await validateIntegrity(document);
    setDocument(prevDocument => {
      return {
        ...prevDocument,
        ...result
      }
    });
  }

  const getDocumentIcon = doc => {
    switch (doc.contentType) {
      case 'application/pdf':
        return 'pdf';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/x-iwork-pages-sffpages':
        return 'doc';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/x-iwork-keynote-sffnumbers':
        return 'excel';
      default:
        return 'img';
    }
  };


  return (
    <>
      {
        !document ?
          <React.Fragment />
          :
          <TableRow key={document.name}>
            <TableColumn>
              <a
                className={`icon ${getDocumentIcon(document)}`}
                href={document.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {document.name}
              </a>
            </TableColumn>
            <TableColumn className="md-text-right">
              {document.hashMatch && document.sizeMatch ? (
                <FontIcon secondary>done</FontIcon>
              ) : (
                <FontIcon error>block</FontIcon>
              )}
            </TableColumn>
          </TableRow>
      }
    </>
  );
}


export default Document;
