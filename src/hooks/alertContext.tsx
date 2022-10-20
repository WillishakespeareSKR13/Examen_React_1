import AtomIcon from '@atoms/AtomIcon';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect
} from 'react';

interface Alert {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

interface IContextProps {
  alert: Alert[];
  setAlert: Dispatch<SetStateAction<Alert[]>>;
}

const ContextAlert = createContext({} as IContextProps);

export const useAlert = () => {
  const { alert, setAlert } = useContext(ContextAlert);
  const insertAlert = (newAlert: Alert) => {
    setAlert([...alert, newAlert]);
  };
  return { insertAlert };
};

interface AlertContextProps {
  time?: number;
}

const typeAlert = {
  error: {
    color: '#d3343c',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/assets/svgs/commons/cross.svg'
  },
  success: {
    color: '#00b881',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/assets/svgs/commons/check.svg'
  },
  warning: {
    color: '#f75b13',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/assets/svgs/commons/cross.svg'
  },
  info: {
    color: '#4b56f0',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/assets/svgs/commons/cross.svg'
  }
};

const AlertContext: FC<AlertContextProps> = ({ children, time }) => {
  const [alert, setAlert] = useState<Alert[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(alert.filter((_, index) => index !== 0));
    }, time || 3000);
    return () => clearTimeout(timer);
  }, [alert, time]);

  return (
    <ContextAlert.Provider value={{ alert, setAlert }}>
      <AtomWrapper
        css={() => css`
          max-width: max-content;
          position: fixed;
          z-index: 9999;
          padding: 10px;
          left: 50%;
          background-color: transparent;
          transform: translateX(-50%);
        `}
      >
        <AnimatePresence>
          {alert.map((item) => (
            <AtomWrapper
              key={item.id}
              css={() => css`
                margin: 0 0 20px 0;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 15px 25px;
                border-radius: 2px;
                background-color: ${typeAlert[item.type].color};
              `}
            >
              <AtomIcon
                icon={typeAlert[item.type].icon}
                css={() => css`
                  width: 18px;
                  height: 15px;
                  svg {
                    path {
                      fill: white;
                    }
                  }
                `}
              />
              <AtomText
                css={() => css`
                  padding: 3px 0px 0px 15px;
                  color: white;
                  font-weight: 600;
                  margin: 0px 0px 0px 15px;
                `}
              >
                {item.message}
              </AtomText>
            </AtomWrapper>
          ))}
        </AnimatePresence>
      </AtomWrapper>
      {children}
    </ContextAlert.Provider>
  );
};

export default AlertContext;
