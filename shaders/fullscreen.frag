layout(set = 0, binding = 0) uniform sampler2D global_textures[];

layout(location = 0) in vec2 i_uv;
layout(location = 0) out vec4 o_color;
void main()
{
    o_color = vec4(texture(global_textures[3], i_uv).rgb, 1.0);
}
