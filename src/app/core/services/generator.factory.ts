import { GeneratorService } from './generator.service';

export function GeneratorFactory(
  length: number
): (service: GeneratorService) => string {
  return (service: GeneratorService) => service.generate(length);
}
