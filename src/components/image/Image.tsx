/* Local styles */
import './styles/image.scss';

/* Local scripts */
import { ImageProps, ImageAttributesType, WrapperAttributesType } from './scripts/image-types';
import { image as imageUtils } from './scripts/image';

export const Image = (props: ImageProps) => {
	const { alt, hasBg, hasLazy, image, imageClass, wrapperClass } = props;
	const hasWrapper = typeof props?.hasWrapper == 'boolean' ? props.hasWrapper : true;

	// Set up initial attributes
	let wrapperAttributes = {} as WrapperAttributesType;
	let imageAttributes = {
		onError: (e: EventsType) => imageUtils.onError(e),
		onLoad: (e: EventsType) => imageUtils.onLoad(e),
		src: image,
	} as ImageAttributesType;

	// Adjust wrapper attributes
	if (hasWrapper) {
		if (wrapperClass) {
			wrapperAttributes.className = wrapperClass;
		}
		if (hasBg) {
			wrapperAttributes.style = {
				backgroundImage: `url(${image})`,
			};
		}
	}

	// Adjust image attributes
	if (alt) {
		imageAttributes.alt = alt;
		imageAttributes.title = alt;
	}
	if (hasLazy) {
		imageAttributes.loading = 'lazy';
	}
	if (imageClass) {
		imageAttributes.className = imageClass;
	}
	if (hasWrapper && hasBg) {
		if (!imageAttributes.className) {
			imageAttributes.className = 'image-hidden';
		} else {
			imageAttributes.className = imageAttributes.className + ' image-hidden';
		}
	}

	return hasWrapper ? (
		<div {...wrapperAttributes}>
			<img {...imageAttributes} />
		</div>
	) : (
		<img {...imageAttributes} />
	);
};
