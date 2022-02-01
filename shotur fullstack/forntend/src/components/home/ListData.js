import React, { useContext } from "react";
import { Short } from "../../context";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ListData({ setGetId }) {
  const { data } = useContext(Short);
  if(data.linksInfo.length === 0) return "No link"
 
  return data.linksInfo.map(
    (link, key) => (
      (
        <div
          className=''
          key={key}
          onClick={() => {
            setGetId(link.id);
          }}
        >
          <div className='border_box mt-3'>
            <div className='d-flex justify-content-between'>
              <a className='nav-link link-name' href={link.short}>
                {link.short}
              </a>
              <CopyToClipboard text={link.short}>
                <i
                  className='fas fa-copy icon-copy nav-link'
                  ata-toggle='tooltip'
                  data-placement='top'
                  title='Copy'
                ></i>
              </CopyToClipboard>
            </div>
            <div className='d-flex justify-content-between p-3'>
              <span>Total click : {link.metadata?.count}</span>
              <span>{moment(link.metadata?.created).format("L")}</span>
            </div>
          </div>
        </div>
      )
    )
  );
}

export default ListData;
