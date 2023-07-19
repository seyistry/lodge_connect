import { PropTypes } from 'prop-types';
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const icons = {
  0: <BuildingLibraryIcon className="w-10 h-10 text-brand-500" />,
  1: <BuildingOffice2Icon className="w-10 h-10 text-brand-500" />,
  2: <BuildingOfficeIcon className="w-10 h-10 text-brand-500" />,
};

ServicesCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number,
};

export default function ServicesCard(props) {
  const { title, description, index } = props;
  return (
    <div className="flex w-[300px] h-[200px] bg-[white] rounded-lg justify-center items-center shadow">
      <div>
        <div className="flex justify-center">{icons[index]}</div>
        <p className="text-xl font-bold text-brandText-500 text-center">
          {title}
        </p>
        <p className="text-sm font-semibold text-brandText-100 text-center">
          {description}
        </p>
      </div>
    </div>
  );
}
